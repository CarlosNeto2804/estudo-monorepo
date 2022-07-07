import { Document } from 'mongoose';
export interface IClient extends Document{
  provider: string;
  displayName: string;
  email: string;
  account_id?: string;
  picture: string;
  _raw: string;
}
export interface IClientDTO{
  provider: string;
  displayName: string;
  email: string;
  account_id?: string;
  picture: string;
  _raw: string;
}
