import { Document } from 'mongoose';
export interface IClient extends Document{
  privider: string;
  displayName: string;
  email: string;
  account_id: string;
  picture: string;
  _raw: string;
}
