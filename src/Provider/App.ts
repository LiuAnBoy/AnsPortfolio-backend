import { Database } from './Database';
import Express from './Express';

/* eslint class-methods-use-this: "off" */
class App {
  public loadServer(): void {
    Express.init();
  }

  public loadDatabase(): void {
    Database.init();
  }
}

export default new App();
