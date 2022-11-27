import { Request, Response, NextFunction } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import Locals from '../providers/Locals';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid Credential' });
    }

    const decoded = jsonwebtoken.verify(
      token,
      Locals.config().appSecret
    ) as DecodedPayload;

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    req.token = token;
    req.user = user;

    return next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ error, message: 'Server Error' });
    }
  }
};

export default auth;

export interface DecodedPayload extends JwtPayload {
  _id: string | JwtPayload;
}
