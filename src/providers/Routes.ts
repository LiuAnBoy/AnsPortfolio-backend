import { Application } from 'express';
import router from '../routes/Api';

/* eslint class-methods-use-this: "off" */
class Routes {
  public mountApi(_express: Application): Application {
    console.log('Routes   :: Mounting API Routes...');
    return _express.use('/api', router);
  }
}

export default new Routes();
