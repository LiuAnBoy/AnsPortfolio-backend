import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MongoError } from 'mongodb';

import User, { UserModel, UserProps } from '../../Models/Auth';

class UserController {
  public static async Register(req: Request, res: Response) {
    try {
      await User.create(req.body);

      return res.status(200).send({ success: true, message: '註冊成功。' });
    } catch (error) {
      if (error instanceof Error) {
        return UserController.handleRegistrationError(res, error);
      }
      return res
        .status(500)
        .send({ success: false, message: 'Internal Server Error' });
    }
  }

  public static async Login(req: Request, res: Response) {
    const { email, password }: UserProps = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: '未找到使用者名稱。' });
      }

      const isMatch = await user.comparePassword(password as string);

      if (!isMatch) {
        return res.status(403).send({ success: false, message: '密碼錯誤' });
      }

      const token = await UserController.generateAuthToken(user, res);

      return res.status(200).send({
        success: true,
        message: '登入成功',
        data: {
          token,
          expiresIn: res.locals.app.jwtExpiresIn * 86400,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Internal Server Error' });
    }
  }

  public static async getUser(req: Request, res: Response) {
    const { user } = req.body;

    try {
      return res.status(200).send({ success: true, data: user });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Internal Server Error' });
    }
  }

  public static async updateUser(req: Request, res: Response) {
    const { user } = req.body;

    try {
      const newData = {
        ...user,
        ...req.body,
        updatedAt: new Date(),
      };

      await User.findByIdAndUpdate(user._id, newData, {
        $new: true,
      });

      return res.status(200).send({ success: true, message: '更新成功。' });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Internal Server Error' });
    }
  }

  private static async generateAuthToken(
    user: UserModel,
    res: Response,
  ): Promise<string> {
    return jwt.sign({ id: user._id }, res.locals.app.appSecret, {
      expiresIn: res.locals.app.jwtExpiresIn * 86400,
    });
  }

  private static handleRegistrationError(
    res: Response,
    error: Error,
  ): Response {
    const mongoError = error as MongoError;
    if (mongoError.code === 11000) {
      return res
        .status(409)
        .send({ success: false, message: '使用者名稱已被註冊' });
    }
    return res
      .status(500)
      .send({ success: false, message: 'Internal Server Error', error });
  }
}

export default UserController;
