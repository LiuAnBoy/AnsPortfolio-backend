import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Application } from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

class Http {
  public static mount(_express: Application): Application {
    // Enables the request body parser
    _express.use(bodyParser.json());
    _express.use(bodyParser.urlencoded({ extended: false }));

    _express.use(
      fileUpload({
        limits: { fieldSize: 5 * 1024 * 1024 },
        useTempFiles: true,
        tempFileDir: '/tmp/',
      }),
    );

    _express.use(morgan('dev'));

    // Disable the x-powered-by header in response
    _express.disable('x-powered-by');

    // Enables the CORS
    _express.use(cors());

    // Enables the "gzip" / "deflate" compression for response
    _express.use(compression());

    console.log('Middleware :: Mount Http middleware');

    return _express;
  }
}

export default Http;
