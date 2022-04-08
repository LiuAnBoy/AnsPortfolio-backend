import MongooseService from './Database';
import Express from './Express';

/* eslint class-methods-use-this: "off" */
class App {
  private MongooseService = new MongooseService();

  public loadServer(): void {
    Express.init();
  }

  public loadDatabase(): void {
    this.MongooseService.init();
  }
}

export default new App();
