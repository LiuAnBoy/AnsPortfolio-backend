import mongoose from 'mongoose';

import Locals from './Locals';

export class Database {
  public static async init() {
    const dsn = Locals.config().mongoUrl;

    mongoose.set('strictQuery', false);

    try {
      await mongoose.connect(dsn);
      console.log('\x1b[33m%s\x1b[0m', 'Database   :: MongoDB Connected');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default mongoose;
