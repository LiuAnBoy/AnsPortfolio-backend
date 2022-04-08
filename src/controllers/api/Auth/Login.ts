import jsonwebtoken from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

import User, { IUserModel } from '../../../models/User';

class Login {
  public static async perform(req: Request, res: Response) {
    await check('email', 'E-mail is Required').notEmpty().run(req);
    await check('email', 'E-mail is not valid').isEmail().run(req);
    await check('password', 'Password is Required').notEmpty().run(req);
    await check('password', 'Password length must be atleast 8 characters')
      .isLength({ min: 6 })
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        error: errors,
      });
    }

    const _email = req.body.email;
    const _password = req.body.password;

    User.findOne({ email: _email }, (err: MongoError, user: IUserModel) => {
      if (err) {
        return res.json({
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          results: null,
        });
      }

      if (!user.password) {
        return res.status(404).json({
          success: false,
          message: 'Please login using your social credentials',
          results: null,
        });
      }

      user.comparePassword(_password, (error: Error, isMatch: boolean) => {
        if (error) {
          return res.json({
            error,
          });
        }

        if (!isMatch) {
          return res.json({
            success: false,
            message: 'Password does not match!',
            results: null,
          });
        }

        const token = jsonwebtoken.sign(
          { email: _email, password: _password },
          res.locals.app.appSecret,
          { expiresIn: res.locals.app.jwtExpiresIn * 60 }
        );

        return res.json({
          user,
          token,
          token_expires_in: res.locals.app.jwtExpiresIn * 60,
        });
      });
    });
  }
}

export default Login;
