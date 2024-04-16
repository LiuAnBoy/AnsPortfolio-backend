import { Application } from 'express';

import CORS from './Cors';
import CsrfToken from './CSRFToken';
import Http from './Http';

/* eslint no-param-reassign: "off" */
class Kernel {
  public static init(_express: Application): Application {
    // Mount basic express apis middleware
    _express = Http.mount(_express);

    // Mount csrf token verification middleware
    _express = CsrfToken.mount(_express);

    // Mount CORS middleware
    _express = CORS.mount(_express);

    return _express;
  }
}

export default Kernel;
