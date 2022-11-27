import { Request, Response } from 'express';
import { Tokens } from '../../../interfaces/models/User';

class Logout {
  public static async single(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(404)
          .send({ success: false, message: 'Please login' });
      }

      req.user.tokens = req.user.tokens.filter(
        (token: Tokens) => token.token !== req.token
      );

      await req.user.save();

      return res.status(200).send({ success: true, message: 'Logout' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  public static async all(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(404)
          .send({ success: false, message: 'Please login' });
      }

      req.user.tokens = [];

      await req.user.save();

      return res
        .status(200)
        .send({ success: true, message: 'Logout All devices' });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

export default Logout;
