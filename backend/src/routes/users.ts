import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User.ts';

const router: express.Router = express.Router();

const validateUserRegistration = [
  check("Nom d'utilisateur", "Veuillez entrer un nom d'utilisateur")
    .not()
    .isEmpty(),
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check(
    'password',
    'Veuillez entrer un mot de passe avec 6 ou plus de caractères'
  ).isLength({ min: 6 })
];

const DbCheckEmailAlreadyExists = async (email: string) => {
  const user: IUser = await User.findOne({ email });
  if (user) {
    return true;
  }
  return false;
};

const DbCheckUsernameAlreadyExists = async (username: string) => {
  const user = await User.findOne({ username });
  if (user) {
    return true;
  }
  return false;
};

const DbUserCheck = async (username: string, email: string) => {
  const emailAlreadyExists = await DbCheckEmailAlreadyExists(email);
  const usernameAlreadyExists = await DbCheckUsernameAlreadyExists(username);

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

const sendJwtToken = async user => {
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};

const DbCreateUser = async (
  username: string,
  email: string,
  password: string
) => {
  const user = new User({
    username,
    email,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  sendJwtToken(user);
};

const handleUserRegistration = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    DbUserCheck(username, email);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur lors de la vérification des données');
  }

  try {
    DbCreateUser(username, email, password);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur lors de la création de l'utilisateur");
  }
};

router.post('/register', validateUserRegistration, handleUserRegistration);

export default router;
