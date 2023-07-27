import { Request } from 'express';
import { IUser } from './user.type';

export type RequestType = {
  user: IUser;
} & Request;
