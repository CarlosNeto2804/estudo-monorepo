import Express from 'express';
import { CalculatorService } from './calc.service';
import { CalculatorController } from './calc.controller';
import { IDataBase } from '../../interfaces/IDataBase';
import { IPrice } from '../../interfaces/IPrice';
import { CalculatorFormatter } from './calc.formatter.utils';

export class CalculatorBankCertificatesDeposit {
  public constructor(app: Express.Application, db: IDataBase<IPrice>) {
    const formatter = new CalculatorFormatter();
    const service = new CalculatorService(formatter, db);
    new CalculatorController(app, service);
  }
}
