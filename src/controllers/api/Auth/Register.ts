import { check, validationResult } from 'express-validator';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';
import User from '../../../models/User';

class Register {
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

    const user = new User({
      email: _email,
      password: _password,
    });

    User.findOne({ email: _email }, (err: MongoError, existingUser: any) => {
      if (err) {
        return res.json({ error: err });
      }

      if (existingUser) {
        return res.json({
          error: ['Account with the e-mail address already exists.'],
        });
      }

      user.save((error) => {
        if (error instanceof MongoError) {
          return res.json({ error: err });
        }
        return res.json({
          message: ['You have been successfully registered with us!'],
        });
      });
    });
  }
}

export default Register;
