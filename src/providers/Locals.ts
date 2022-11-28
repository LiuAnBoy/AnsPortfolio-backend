import path from 'path';
import * as dotenv from 'dotenv';
import { Application } from 'express';
import { LocalProps } from '../interfaces/Locals';

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): LocalProps {
    dotenv.config({
      path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
    });

    const port = Number(process.env.PORT) || 8080;
    const url = process.env.APP_URL || `http://localhost:${port}`;
    const appSecret = process.env.APP_SECRET || 'This is secret key';
    const mongooseUrl = process.env.MONGO_URI || '';

    const jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || 3;

    return {
      url,
      port,
      appSecret,
      mongooseUrl,
      jwtExpiresIn,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    /* eslint no-param-reassign: ["off"] */
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
