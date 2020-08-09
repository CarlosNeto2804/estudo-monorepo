import { Model } from 'mongoose';
import { IClient } from '../../interfaces/repo/IClient';
export class ClientService {
  constructor(private repo: Model<IClient>) {}
  public async findAll():Promise<IClient[]>{
    return await this.repo.find({})
  }
  public async save(clientData: IClient): Promise<string> {
    try {
      const exist = await this.verify(clientData.account_id);
      if (exist) return 'Usuário já cadastrado';
      else {
        await this.repo.create(clientData);
        return 'Usuário criado com sucesso!';
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  private async verify(account_id: string): Promise<boolean> {
    const client = await this.repo.findOne({ account_id });
    return client._id ? true : false;
  }
}
