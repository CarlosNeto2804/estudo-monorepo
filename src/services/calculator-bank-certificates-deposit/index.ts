import { Application } from 'express';
import { CalculatorService } from './calc.service';
import { CalculatorController } from './calc.controller';
import { IDataBase } from '../../interfaces/IDataBase';
import { IPrice } from '../../interfaces/IPrice';
import { CalculatorFormatter } from './calc.formatter.utils';
/**
 * - Serviço de Calculo do Certificado de Depósito Bancário
 */
export class CalculatorBankCertificatesDeposit {
  public constructor(app: Application, db: IDataBase<IPrice>) {
    const formatter = new CalculatorFormatter();
    const service = new CalculatorService(formatter, db);
    new CalculatorController(app, service);
  }
}
