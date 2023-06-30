/*
 * Controllers pour users routes: login, register, get user
 */
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.js';
import { Request, Response } from 'express';

const validateUserRegistration = [
  check('nomUtilisateur', "Veuillez entrer un nom d'utilisateur")
    .not()
    .isEmpty(),
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check(
    'motDePasse',
    'Veuillez entrer un mot de passe avec 6 ou plus de caractères'
  ).isLength({ min: 6 })
];

const validateUserLogin = [
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check('motDePasse', 'Veuillez entrer un mot de passe valide').exists()
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

const DbUserCheckRegistration = async (
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

const DbUserMatchCheck = async (
  email: string,
  motDePasse: string,
  res: Response
) => {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: 'Email invalide (absent de la base de données)' }]
    });
  }

  const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: 'Mot de passe invalide (pas le bon mot de passe)' }]
    });
  }

  sendJwtToken(user, res);
};

const DbCreateUser = async (
  nomUtilisateur: string,
  email: string,
  motDePasse: string,
  res: Response
) => {
  const user = new User<Partial<IUser>>({
    nomUtilisateur: nomUtilisateur,
    email,
    motDePasse: motDePasse
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
    DbUserCheckRegistration(nomUtilisateur, email, res);
  } catch (err: any) {
    console.error(err.message);
    return res
      .status(500)
      .send(`Erreur serveur lors de la vérification des données : ${err}`);
  }

  try {
    DbCreateUser(nomUtilisateur, email, motDePasse, res);
  } catch (err: any) {
    console.error(err.message);
    return res
      .status(500)
      .send(`Erreur serveur lors de la création de l'utilisateur : ${err}`);
  }
};

const handleGetUser = async (req: Request & { user: any }, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-motDePasse');
    return res.json(user);
  } catch (err: any) {
    console.error(err.message);
    return res
      .status(500)
      .send(`Erreur serveur lors de la récupération de l'utilisateur: ${err}`);
  }
};

const handleUserLogin = async (req: Request & { user: any }, res: Response) => {
  const { email, motDePasse } = req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    const resultMatchCheck = DbUserMatchCheck(email, motDePasse, res);
    return resultMatchCheck;
  } catch (err: any) {
    console.log(
      'erreur serveur lors de la vérification des données DbUserMatchCheck'
    );
    console.error(err.message);
    return res.status(500).send("Erreur serveur lors de l'authentification");
  }
};

const sendJwtToken = (user: IUser, res: Response) => {
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
      res.json({ token });
    }
  );
};

export {
  validateUserRegistration,
  handleUserRegistration,
  handleGetUser,
  validateUserLogin,
  handleUserLogin,
  DbUserMatchCheck,
  DbUserCheckRegistration,
  DbCheckEmailAlreadyExists,
  DbCheckUsernameAlreadyExists,
  DbCreateUser
};
