import { Model, } from 'mongoose';
import { IClient, IClientDTO } from '../../interfaces/repo/IClient';
import { Log } from '../../log';
export class ClientService {
  private logger: Log;
  constructor(private repo: Model<IClient>) {
    this.logger = new Log('ClientService');
  }
  public async findAll(): Promise<IClient[]> {
    try {
      return await this.repo.find({});
    } catch (error) {
      this.logger.error(error);
      new Error('Falha ao buscar todos os clientes')
    }
  }
  public async save(clientData: IClientDTO): Promise<string> {
    try {
      /**
       * Verifica se cliente já foi cadastrado
       */
      const exist = await this.verify(clientData.account_id);
      if (exist) return 'Cliente já cadastrado';
      else {
        /**
         * Caso não tenha sido ele é registrado
         */
        await this.repo.create(clientData);
        return 'Cliente criado com sucesso!';
      }
    } catch (error) {
      this.logger.error(error);
      return 'Falha ao cadastrar cliente';
    }
  }
  private async verify(account_id: string): Promise<boolean> {
    try {
      const client = await this.repo.findOne({ account_id });
      return client ? true : false;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
