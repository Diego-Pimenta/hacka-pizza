import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error occurred',
      errors: err.errors,
    });
  }

  return res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
    error: err,
  });
};
