import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user: any;
      token: string;
    }
  }
}
