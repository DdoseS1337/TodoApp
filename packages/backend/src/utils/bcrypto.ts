import { genSalt, hash, compare } from 'bcryptjs';

const SALT = 10;

export const hashing = async (data: string): Promise<string> => {
  const salt = await genSalt(SALT);
  const hashed = await hash(data, salt);
  return hashed;
};

export const comparing = async (data: string, hashedData: string): Promise<boolean> => {
  const matchFound = await compare(data, hashedData);
  return matchFound;
};
