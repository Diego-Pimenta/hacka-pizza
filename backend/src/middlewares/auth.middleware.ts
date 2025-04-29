import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handler';
import { getClientById } from '../services/client.service';

const protectAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const client = await getClientById(decoded.id);
    if (!client) {
      return res.status(401).json({ message: 'Client not found' });
    }

    req.client = client;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unhathorized access' });
  }
};
