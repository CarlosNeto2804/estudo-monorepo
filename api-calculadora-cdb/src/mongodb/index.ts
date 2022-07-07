import { connect } from 'mongoose';
import ConfigEnvVars from './../config';
import { Log } from './../log';
export class MongoDB {
  private logger:Log
  constructor() {
    this.logger = new Log('MongoDB')

  }
  private getOptions() {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
  public async connect() {
    try {
      const db_uri: string =  ConfigEnvVars.get('MONGO_URL') || process.env.MONGO_URL
      await connect(db_uri, this.getOptions());
      this.logger.success('Banco de dados Mongo DB conectado com sucesso');
    } catch (error) {
      this.logger.error(error)
      this.logger.error('Serviço de Banco de Dados Mongo DB não está funcionando')
    }
  }
}
