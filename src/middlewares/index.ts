import { Application } from 'express';

import Http from './Http';
import CsrfToken from './CsrfToken';

/* eslint no-param-reassign: "off" */
class Kernel {
  public static init(_express: Application): Application {
    _express = Http.mount(_express);
    _express = CsrfToken.mount(_express);

    return _express;
  }
}

export default Kernel;
