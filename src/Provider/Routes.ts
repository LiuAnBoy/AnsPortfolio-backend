import { Application } from 'express';

import auth from '../Middleware/User';
import ApiRouter from '../Routes/Api';
import fileRouter from '../Routes/File';
import authRouter from '../Routes/User';

class Routes {
  public static mountApi(_express: Application): Application {
    console.log('Routes     :: Mount API Routes');
    return _express.use('/api', ApiRouter);
  }

  public static mountAuth(_express: Application): Application {
    console.log('Routes     :: Mount Auth Routes');
    return _express.use('/auth', authRouter);
  }

  public static mountFile(_express: Application): Application {
    console.log('Routes     :: Mount File Routes');
    return _express.use('/file', auth, fileRouter);
  }
}

export default Routes;
