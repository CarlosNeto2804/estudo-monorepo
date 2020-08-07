import { Schema, model } from 'mongoose';
export class Client extends Schema {
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
    model('Client', this);
  }
}

