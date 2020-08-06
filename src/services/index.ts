import Express from 'express';
import { IDataBase } from '../interfaces/IDataBase';
import { CalculatorBankCertificatesDeposit } from './calculator-bank-certificates-deposit';
import { HomeIndex } from './home-index';
export class Services {
  constructor(app: Express.Application, db: IDataBase<any>) {
    new HomeIndex(app);
    new CalculatorBankCertificatesDeposit(app, db);
  }
}
