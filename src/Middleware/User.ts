import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../Models/Auth';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token)
      return res
        .status(401)
        .send({ success: false, message: 'Invalid Credential' });

    const decoded = jwt.verify(token, res.locals.app.appSecret) as JwtPayload;

    const user = await User.findById(decoded.id, { password: 0, __v: 0 });

    req.body.user = user;
    req.body.token = token;

    return next();
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Internal Server Error' });
  }
};

export default auth;
