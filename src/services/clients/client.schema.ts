import { Schema, model, Model } from 'mongoose';
import { IClient } from '../../interfaces/repo/IClient';
class Client extends Schema {
  constructor() {
    super(
      {
        privider: String,
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
export default model<IClient>('User', new Client());
