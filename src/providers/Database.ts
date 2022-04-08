import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

import Locals from './Locals';

class MongooseService {
  private mongoose = mongoose;

  public getInstance() {
    return this.mongoose;
  }

  public init() {
    const dsn = Locals.config().mongooseUrl;

    try {
      this.mongoose.connect(dsn);
      console.log('\x1b[33m%s\x1b[0m', 'Database :: MongoDB Connected');
    } catch (error) {
      const retrySeconds = 5;
      if (error instanceof MongoError) {
        console.log(error);
        throw error;
      }
      setTimeout(this.init, retrySeconds * 1000);
    }
  }
}

export default MongooseService;
