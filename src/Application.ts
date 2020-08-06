import Express from 'express';
import Cors from 'cors';
import { DataBase } from './database';
import { IPrice } from './interfaces/IPrice';
import {Services} from './services'
// import  ConfigEnvVars  from './config';
class Application {
  public app: Express.Application;
  public db: DataBase<IPrice>;
  public constructor() {
    this.init();
  }
  private async init() {
    await this.database();
    this.app = Express();
    this.middlewares();
    this.listenPort();
    this.services();
  }
  private async database() {
    try {
      this.db = new DataBase<IPrice>();
      this.db.connect().then((res) => {
        if (res.connected) {
          console.log(`${res.message} with status ${res.status}`);
        }
        this.db.store.forEach((el) => {
          const [day, month, year] = el.dtDate.split('/');
          el.dtDate = `${year}-${month}-${day}`;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  private services(){
    new Services(this.app, this.db)
  }
  private middlewares(): void {
    this.app.use(Express.json());
    this.app.use(Cors());
  }
  private listenPort(): void {
    this.app.listen(process.env.PORT || 3000, () => console.log('Service Running'));
  }
}
export default new Application();
