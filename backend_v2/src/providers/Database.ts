import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import Bluebird from 'bluebird';

import Locals from './Locals';

export class Database {
  // Initialize your database pool
  public static init(): any {
    const dsn = Locals.config().mongooseUrl;

    mongoose.Promise = Bluebird;

    mongoose.connect(dsn, (error) => {
      if (error instanceof MongoError) {
        console.log(error);
        throw error;
      } else {
        console.log('\x1b[33m%s\x1b[0m', 'Database :: MongoDB Connected');
      }
    });
  }
}

export default mongoose;
