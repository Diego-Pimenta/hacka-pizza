import { NextFunction, Request, Response } from 'express';
import * as UserService from '../services/user.service';
import { comparePasswords } from '../utils/bcrypt.handler';
import { generateToken } from '../utils/jwt.handler';
import { loginSchema } from '../utils/zod';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ success: false, error: { message: 'User not found' } });
      return;
    }

    const doesPasswordMatch = await comparePasswords(password, user.password);
    if (doesPasswordMatch) {
      const token = generateToken({ id: user.id }, '1h');
      res.status(200).json({ success: true, data: token });
    } else {
      res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }
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
