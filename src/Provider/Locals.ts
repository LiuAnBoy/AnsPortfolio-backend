import * as dotenv from 'dotenv';
import { Application } from 'express';

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */

  public static config(): LocalProps {
    const env = process.env.NODE_ENV || 'development';
    dotenv.config({
      path: `.env${env === 'development' ? '.development' : ''}`,
    });
    // dotenv.config();

    const port = Number(process.env.PORT) || 8000;
    const url = process.env.APP_URL || `http://localhost:${port}`;
    const appSecret = process.env.APP_SECRET || 'This is secret key';
    const mongoUrl = process.env.MONGO_URI || '';

    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY || '';
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET || '';
    const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || '';

    const jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || 3;

    return {
      url,
      port,
      appSecret,
      mongoUrl,
      jwtExpiresIn,
      cloudinaryCloudName,
      cloudinaryApiKey,
      cloudinaryApiSecret,
      cloudinaryUploadPreset,
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

export interface LocalProps {
  url: string;
  port: number;
  mongoUrl: string;
  appSecret: string;
  jwtExpiresIn: number;
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
  cloudinaryUploadPreset: string;
}
