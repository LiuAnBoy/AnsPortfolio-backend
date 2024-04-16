import cors from 'cors';
import { Application } from 'express';

import Locals from '../Provider/Locals';

class CORS {
  public static mount(_express: Application): Application {
    const options = {
      origin: Locals.config().url,
      optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    };

    _express.use(cors(options));

    console.log('Middleware :: Mount CORS middleware');

    return _express;
  }
}

export default CORS;
