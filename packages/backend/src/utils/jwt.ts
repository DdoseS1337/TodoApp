import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const signToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPORES_IN
  });

export const createAndSendJWToken = (id: string, res: Response) => {
  const token = signToken(id);
  const cookieOptions = {
    expires: new Date(Date.now() + +process.env.JWT_EXPIRATION * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  res.cookie('jwt', token, cookieOptions);
  return token;
};
