import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const auth = function (
  req: Request & { user?: string },
  res: Response,
  next: NextFunction
): Response | void {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'Pas de token fourni, authentification impossible'
    });
  }

  if (typeof token !== 'string') {
    throw new Error('Token invalide : type string attendu');
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(500).send({
      auth: false,
      message: 'Token invalide. Veuillez vous reconnecter'
    });
  }
};
