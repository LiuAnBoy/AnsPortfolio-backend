import express, { Application } from 'express';

import Middleware from '../Middleware';
import Locals from './Locals';
import Routes from './Routes';

class Express {
  public express: Application;

  constructor() {
    this.express = express();

    this.mountMiddlewares();
    this.mountRoutes();
    this.mountSettings();
  }

  private mountSettings(): void {
    this.express = Locals.init(this.express);
  }

  private mountRoutes(): void {
    // Load API routes
    this.express = Routes.mountApi(this.express);
    this.express = Routes.mountAuth(this.express);
    this.express = Routes.mountFile(this.express);
  }

  private mountMiddlewares(): void {
    // Mount basic express apis middleware
    this.express = Middleware.init(this.express);
  }

  public init() {
    const { port } = Locals.config();

    // // Registering Exception / Error Handlers
    // this.express.use(ExceptionHandler.errorHandler);

    // Start the server on the specified port
    this.express
      .listen(port, () => {
        return console.log(
          '\x1b[33m%s\x1b[0m',
          `Server     :: Running SERVER @ 'http://localhost:${port}'`,
        );
      })
      .on('error', (_error) => {
        return console.log('Error: ', _error.message);
      });
  }
}

export default new Express();
