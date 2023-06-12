import { Request, Response, NextFunction } from 'express';
import auth from '../../middleware/auth.ts';

jest.mock('jsonwebtoken');

describe('Auth middleware', () => {
  let req: Partial<Request>;
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
});
