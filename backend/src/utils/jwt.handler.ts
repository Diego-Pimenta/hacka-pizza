import jwt from 'jsonwebtoken';

type TPayload = { id: string };

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export const generateToken = (payload: TPayload, expiresIn: string): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): TPayload => {
  return jwt.verify(token, JWT_SECRET) as TPayload;
};
