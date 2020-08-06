import Express from 'express';
import { CalculatorService } from './calc.service';
import { IParamsToCalculate } from '../../interfaces/IParamsToCalculate';
export class CalculatorController {
  constructor(
    private app: Express.Application,
    private service: CalculatorService
  ) {
    this.registry()
  }
  registry() {
    this.app.post('/cdb/calculate-price', (req, res) => {
      const info = req.body as IParamsToCalculate;
      const erros = Validator.validate(info);
      if (erros.length){
        return res.status(400).send(erros);
      }
      const result = this.service.calculateCDBValue(info);
      return res.send(result);
    });
  }
}
class Validator {
  static validate(info: IParamsToCalculate): string[] {
    const erros: string[] = [];
    if (!info.cdbRate) erros.push('Informe a taxa do CDB!');
    if (!info.investmentDate) erros.push('Informe a data do investimento!');
    if (!info.currentDate) erros.push('Informe a data limite!');
    return erros;
  }
}
