import { Application } from 'express';

import Locals from '../providers/Locals';

/* eslint no-console: off */
class CsrfToken {
  public static mount(_express: Application): Application {
    console.log("Booting the 'CsrfToken' middleware...");

    _express.set('trust proxy', 1);

    // Interpolate the user variable into your pug files
    _express.use((req, res, next) => {
      res.locals.user = req.user;
      res.locals.app = Locals.config();
      next();
    });

    // Check for CSRF token iff the original url
    // does not contains the api substring
    _express.use((req, res, next) => {
      if (req.originalUrl.includes('/api/')) {
        next();
      }
    });

    return _express;
  }
}

export default CsrfToken;
