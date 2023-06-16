/*
 * Controllers pour users routes: login, register, get user
 */
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.ts';
import { Request, Response } from 'express';

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
    DbUserCheckRegistration(nomUtilisateur, email, res);
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

const validateUserLogin = [
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check('password', 'Veuillez entrer un mot de passe valide').exists()
];

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

const DbUserMatchCheck = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: 'Email invalide (absent de la base de données)' }]
    });
  }

  const isMatch = await bcrypt.compare(password, user.motDePasse);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: 'Mot de passe invalide (pas le bon mot de passe)' }]
    });
  }

  sendJwtToken(user, res);
};

const handleUserLogin = async (req: Request & { user: any }, res: Response) => {
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
