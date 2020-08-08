import Express from 'express';
import Passport from 'passport';
import Cors from 'cors';
import { DataBase } from './database';
import { IPrice } from './interfaces/IPrice';
import { IServiceConstructor } from './interfaces/IServiceConstructor';
import { Services } from './services';
class Application {
  private app: Express.Application;
  private db: DataBase<IPrice>;
  public constructor() {
    this.init();
  }
  private async init() {
    await this.database();
    this.app = Express();
    this.middlewares();
    this.services();
    this.listenPort();
  }
  /**
   *
   * faz a leitura do arquivo .csv e disponibiliza os dados em formato JSON para a aplicação
   */
  private async database() {
    try {
      this.db = new DataBase<IPrice>();
      this.db.connect().then((res) => {
        if (res.connected) {
          console.log(`${res.message} with status ${res.status}`);
        }

        this.db.store.forEach((el) => {
          /* ajusta o formato das datas dd/mm/aaaa -> yyyy-mm-dd */
          const [day, month, year] = el.dtDate.split('/');
          el.dtDate = `${year}-${month}-${day}`;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * injeta as independecias dos serviços e os habilita
   */
  private services() {
    const params: IServiceConstructor = {
      app: this.app,
      db: this.db,
      passport: Passport,
    };
    new Services(params);
  }
  /**
   * Insere os middlewares que a aplicação necessita
   */
  private middlewares(): void {
    this.app.use(Express.json());
    this.app.use(Cors({ origin: '*' }));
    this.app.use(Passport.initialize());
  }
  /**
   * Habilita a porta de acesso
   */
  private listenPort(): void {
    this.app.listen(process.env.PORT || 3000, () =>
      console.log('Service Running')
    );
  }
}
export default new Application();
