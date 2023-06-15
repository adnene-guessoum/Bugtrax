import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.ts';
import { Request, Response } from 'express';

const router: express.Router = express.Router();

const validateUserRegistration = [
  check("Nom d'utilisateur", "Veuillez entrer un nom d'utilisateur")
    .not()
    .isEmpty(),
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check(
    'motDePasse',
    'Veuillez entrer un mot de passe avec 6 ou plus de caractères'
  ).isLength({ min: 6 })
];

const DbCheckEmailAlreadyExists = async (email: string) => {
  const user: IUser | null = await User.findOne({ email });
  if (user) {
    return true;
  }
  return false;
};

const DbCheckUsernameAlreadyExists = async (nomUtilisateur: string) => {
  const user = await User.findOne({ nomUtilisateur });
  if (user) {
    return true;
  }
  return false;
};

const DbUserCheck = async (
  nomUtilisateur: string,
  email: string,
  res: Response
) => {
  const emailAlreadyExists = await DbCheckEmailAlreadyExists(email);
  const usernameAlreadyExists = await DbCheckUsernameAlreadyExists(
    nomUtilisateur
  );

  if (emailAlreadyExists) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Cette addresse mail correspond déja à un utilisateur enregistrée.'
        }
      ]
    });
  }

  if (usernameAlreadyExists) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Ce nom d'utilisateur est déja pris." }] });
  }
};

const sendJwtToken = async (user: IUser, res: Response) => {
  const payload = {
    user: {
      id: user._id
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json(token);
    }
  );
};

const DbCreateUser = async (
  nomUtilisateur: string,
  email: string,
  motDePasse: string,
  res: Response
) => {
  const user = new User<Partial<IUser>>({
    nomUtilisateur,
    email,
    motDePasse
  });

  const salt = await bcrypt.genSalt(10);
  user.motDePasse = await bcrypt.hash(motDePasse, salt);

  await user.save();

  sendJwtToken(user, res);
};

const handleUserRegistration = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const { nomUtilisateur, email, motDePasse } = req.body;

  try {
    DbUserCheck(nomUtilisateur, email, res);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur lors de la vérification des données');
  }

  try {
    DbCreateUser(nomUtilisateur, email, motDePasse, res);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Erreur serveur lors de la création de l'utilisateur");
  }
};

router.post(
  '/register',
  validateUserRegistration,
  handleUserRegistration as any
);

export default router;
