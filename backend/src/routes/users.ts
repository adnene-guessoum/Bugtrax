import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  validateUserRegistration,
  handleUserRegistration,
  handleGetUser,
  validateUserLogin,
  handleUserLogin
} from '../controllers/users.js';

const router: express.Router = express.Router();

router.post(
  '/register',
  validateUserRegistration,
  handleUserRegistration as any
);
router.post('/login', validateUserLogin, handleUserLogin as any);
router.get('/', auth as any, handleGetUser as any);

export default router;
