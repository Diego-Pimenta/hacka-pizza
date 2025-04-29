import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map((e: any) => e.message) as string[];
    res.status(400).json({ success: false, error: { message: 'Validation error occurred', errors: errors } });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({ success: false, error: { message: message } });
};
