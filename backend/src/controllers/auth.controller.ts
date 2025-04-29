import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../utils/zod';

export const login = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { email, password } = req.body;
    // TODO: Implement login logic here
  } catch (error) {
    next(error);
  }
};

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const login = req.body;
    loginSchema.parse(login);
    next();
  } catch (error) {
    next(error);
  }
};
