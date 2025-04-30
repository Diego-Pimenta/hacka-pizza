import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handler';

export const protectAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    console.log('Token:', token);

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
