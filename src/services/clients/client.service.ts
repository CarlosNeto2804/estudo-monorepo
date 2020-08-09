import { Model, } from 'mongoose';
import { IClient, IClientDTO } from '../../interfaces/repo/IClient';
import { Log } from '../../log';
export class ClientService {
  private logger: Log;
  constructor(private repo: Model<IClient>) {
    this.logger = new Log('ClientService');
  }
  public async findAll(): Promise<IClient[]> {
    return await this.repo.find({});
  }
  public async save(clientData: IClientDTO): Promise<string> {
    try {
      /**
       * Verifica se cliente já foi cadastrado
       */
      const exist = await this.verify(clientData.account_id);
      if (exist) return 'Usuário já cadastrado';
      else {
        /**
         * Caso não tenha sido ele é registrado
         */
        await this.repo.create(clientData);
        return 'Usuário criado com sucesso!';
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  private async verify(account_id: string): Promise<boolean> {
    const client = await this.repo.findOne({ account_id });
    return client ? true : false;
  }
}
