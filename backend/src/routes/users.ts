import express from 'express';
import { auth } from '../middleware/auth.ts';
import {
  validateUserRegistration,
  handleUserRegistration,
  handleGetUser,
  validateUserLogin,
  handleUserLogin
} from '../controllers/users.ts';

const router: express.Router = express.Router();

router.post(
  '/register',
  validateUserRegistration,
  handleUserRegistration as any
);
router.post('/login', validateUserLogin, handleUserLogin as any);
router.get('/authCheck', auth as any, handleGetUser as any);

export default router;
