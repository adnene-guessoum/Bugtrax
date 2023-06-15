import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../../middleware/auth.ts';

jest.mock('jsonwebtoken');

describe('Auth middleware', () => {
  let req: Partial<Request> & { user?: string };
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no token provided', () => {
    req.headers = {};
    auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Pas de token fourni, authentification impossible'
    });
    expect(next).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should return 500 if invalid token provided', () => {
    const error = new Error('Invalid token');

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw error;
    });

    req.headers = { 'x-access-token': 'invalid-token' };

    auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      auth: false,
      message: 'Token invalide. Veuillez vous reconnecter'
    });
    expect(next).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next() if valid token and not return', () => {
    const token = 'valid-token';
    const decoded = { user: 'user_id' };

    (jwt.verify as jest.Mock).mockImplementation(() => decoded);
    req.headers = { 'x-access-token': token };
    req.user = 'user_id';

    auth(req as Request, res as Response, next);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(req).toMatchObject(decoded);
    expect(req.user).toBe(decoded.user);
    expect(next).toHaveBeenCalled();

    expect(res.status).not.toHaveBeenCalledWith(200);
    expect(res.json).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});
