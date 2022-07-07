import { Schema, model } from 'mongoose';
import { IClient } from '../../interfaces/repo/IClient';
/**
 * - Schema do Cliente que será usado no BD
 * - Para reduzir codigo ao inves de modelar um schema  e gerar um clientSchema
 * para depois registrar, a classe Client herda as propriedades do *Schema*
 * e instacia sua super classe
 */
class Client extends Schema {
  constructor() {
    super(
      {
        provider: String,
        displayName: String,
        email: String,
        account_id: String,
        picture: String,
        _raw: String,
      },
      { timestamps: true }
    );
  }
}
export default model<IClient>('Client', new Client());
