import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.ts';
import User, { IUser } from '../models/User.ts';
import { check, validationResult } from 'express-validator';
import { Request, Response } from 'express';

const router: express.Router = express.Router();

const handleGetUser = async (req: Request & { user: any }, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err: any) {
    console.error(err.message);
    res
      .status(500)
      .send("Erreur serveur lors de la récupération de l'utilisateur");
  }
};

router.get('/', auth as any, handleGetUser as any);

const validateUserAuth = [
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check('password', 'Veuillez entrer un mot de passe valide').exists()
];

const sendJwtToken = (user: IUser, res: Response) => {
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

const DbUserMatchCheck = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ errors: [{ msg: 'Email invalide' }] });
  }

  const isMatch = await bcrypt.compare(password, user.motDePasse);

  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: 'Mot de passe invalide' }] });
  }

  sendJwtToken(user, res);
};

const handlePostUser = async (req: Request & { user: any }, res: Response) => {
  const { email, password } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    DbUserMatchCheck(email, password, res);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Erreur serveur lors de l'authentification");
  }
};

router.post('/', validateUserAuth, handlePostUser as any);

export default router;
