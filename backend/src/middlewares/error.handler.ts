import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    // Format Zod errors to be more user-friendly
    const formattedErrors = err.errors.map(error => {
      // Extract the field path (e.g., "address.country" -> "address.country")
      const field = error.path.join('.');
      
      // Get the error message
      const message = error.message;
      
      return { field, message };
    });
    
    res.status(400).json({ 
      success: false, 
      error: { 
        message: 'Validation error occurred', 
        validationErrors: formattedErrors 
      } 
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({ success: false, error: { message: message } });
};
