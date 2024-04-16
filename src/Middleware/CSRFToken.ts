import { Application } from 'express';

import Locals from '../Provider/Locals';

class CsrfToken {
  public static mount(_express: Application): Application {
    _express.set('trust proxy', 1);

    _express.use((req, res, next) => {
      res.locals.app = Locals.config();
      next();
    });

    console.log('Middleware :: Mount CSRFToken middleware');

    return _express;
  }
}

export default CsrfToken;
