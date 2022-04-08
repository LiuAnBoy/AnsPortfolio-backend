import express, { Application } from 'express';

import Locals from './Locals';
import Routes from './Routes';
import Bootstrap from '../middlewares/index';
import ExceptionHandler from '../exception/Handler';

class Express {
  /**
   * Create the express object
   */
  public express: Application;

  /**
   * Initializes the express server
   */
  constructor() {
    this.express = express();

    this.mountDotEnv();
    this.mountMiddleware();
    this.mountRoutes();
  }

  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }

  private mountRoutes(): void {
    this.express = Routes.mountApi(this.express);
  }

  /**
   * Mounts all the defined middlewares
   */
  private mountMiddleware(): void {
    this.express = Bootstrap.init(this.express);
  }

  /**
   * Starts the express server
   */
  public init(): any {
    const port: number = Locals.config().port;

    // Registering Exception / Error Handlers
    this.express.use(ExceptionHandler.errorHandler);

    // Start ther server on the specified port
    this.express
      .listen(port, () => {
        return console.log(
          '\x1b[33m%s\x1b[0m',
          `Server   :: Running @ 'http://localhost:${port}'`
        );
      })
      .on('error', (_error) => {
        return console.log('Error: ', _error.message);
      });
  }
}

export default new Express();
