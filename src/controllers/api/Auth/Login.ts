import { check, validationResult } from 'express-validator';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

import User, { IUserModel } from '../../../models/User';

class Login {
  public static async perform(req: Request, res: Response) {
    await check('email', 'E-mail is Required').notEmpty().run(req);
    await check('email', 'E-mail is not valid').isEmail().run(req);
    await check('password', 'Password is Required').notEmpty().run(req);
    await check('password', 'Password length must be at least 8 characters')
      .isLength({ min: 6 })
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).send(errors);
    }

    const _email = req.body.email;
    const _password = req.body.password;

    User.findOne({ email: _email }, (err: MongoError, user: IUserModel) => {
      if (err) {
        return res.status(500).send({
          success: false,
          error: err,
        });
      }

      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      if (!user.password) {
        return res.status(404).send({
          success: false,
          message: 'Please login using your social credentials',
        });
      }

      user.comparePassword(
        _password,
        async (error: Error | undefined, isMatch: boolean) => {
          if (error) {
            return res.status(500).send({
              error,
            });
          }

          if (!isMatch) {
            return res.status(403).send({
              success: false,
              message: 'Password does not match!',
            });
          }

          // const token = jsonwebtoken.sign(
          //   { email: _email, password: _password },
          //   res.locals.app.appSecret,
          //   { expiresIn: res.locals.app.jwtExpiresIn * 60 }
          // );

          const token = await user.genAuthToken(res.locals.app.appSecret);

          return res.status(201).send({
            user,
            token,
            token_expires_in: res.locals.app.jwtExpiresIn * 86400,
          });
        }
      );
    });
  }
}

export default Login;
