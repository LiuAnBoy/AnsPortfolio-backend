import { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { serve, setup } from 'swagger-ui-express';

import Locals from '../providers/Locals';
import apiDoc from '../swagger/index';

class Http {
  public static mount(_express: Application): Application {
    console.log("Booting the 'HTTP' middleware");

    // Enables the request body parser
    _express.use(bodyParser.json());
    _express.use(bodyParser.urlencoded({ extended: false }));

    // Disable the x-powered-by header in response
    _express.disable('x-powered-by');

    /**
     * Enables the session store
     *
     * Note: You can also add redis-store
     * into the options object.
     */
    const options = {
      resave: true,
      saveUninitialized: true,
      secret: Locals.config().appSecret,
      cookie: {
        maxAge: 1209600000, // two weeks (in ms)
      },
      store: new MongoStore({
        mongoUrl: Locals.config().mongooseUrl,
      }),
    };

    _express.use(session(options));

    // Enables the CORS
    _express.use(cors());

    // Enables the Morgan
    _express.use(morgan('dev'));

    // Enables the "gzip" / "deflate" compression for response
    _express.use(compression());

    _express.use('/swagger', serve, setup(apiDoc));

    return _express;
  }
}

export default Http;
