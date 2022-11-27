import { Types } from 'mongoose';

export interface Tokens {
  token: string;
  _id: Types.ObjectId;
}

export interface IUser {
  email: string;
  password: string;

  tokens: Tokens[];

  createdAt: Date;
}

export default IUser;
