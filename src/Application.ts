import Express from 'express';
import Passport from 'passport';
import Cors from 'cors';
import { DataBase } from './database';
import { IPrice } from './interfaces/IPrice';
import { IServiceConstructor } from './interfaces/IServiceConstructor';
import { Log } from './log';
import { MongoDB } from './mongodb';
import { ModulesOfServices } from './modules';
class Application {
  private app: Express.Application;
  private logger: Log;
  private db: DataBase<IPrice>;
  public constructor() {
    this.logger = new Log('Application');
    this.init();
  }
  private async init() {
    try {
      await this.dataset();
      await this.mongodb();
      this.app = Express();
      this.middlewares();
      this.modulesServices();
      this.listenPort();
    } catch (error) {
      this.logger.error(error);
      process.exit(1)
    }
  }
  private async mongodb() {
    try {
      const mongo = new MongoDB();
      await mongo.connect();
    } catch (error) {
      this.logger.error(error)
      
    }
  }
  /**
   *
   * faz a leitura do arquivo .csv e disponibiliza os dados em formato JSON para a aplicação
   */
  private async dataset() {
    try {
      this.db = new DataBase<IPrice>();
      this.db.connect().then((res) => {
        if (res.connected) {
          this.logger.info(`${res.message} com status ${res.status}`);
        }

        this.db.store.forEach((el) => {
          /* ajusta o formato das datas dd/mm/aaaa -> yyyy-mm-dd */
          const [day, month, year] = el.dtDate.split('/');
          el.dtDate = `${year}-${month}-${day}`;
        });
      }).catch(e=>{
        console.log(e)
      })
    } catch (error) {
      this.logger.error(error);
    }
  }
  /**
   * injeta as independecias dos serviços e os habilita
   */
  private modulesServices() {
    const params: IServiceConstructor = {
      app: this.app,
      db: this.db,
      passport: Passport,
    };
    new ModulesOfServices(params);
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
      this.logger.success('Aplicação Rondando')
    );
  }
}
export default new Application();
