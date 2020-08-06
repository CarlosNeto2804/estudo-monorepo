import Express from 'express';
import { IDataBase } from '../interfaces/IDataBase';
import { CalculatorBankCertificatesDeposit } from './calculator-bank-certificates-deposit';
export class Services {
  constructor(app: Express.Application, db: IDataBase<any>) {
    new CalculatorBankCertificatesDeposit(app, db);
  }
}
