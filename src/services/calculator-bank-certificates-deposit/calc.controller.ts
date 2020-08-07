import Express, { Request, Response } from 'express';
import { CalculatorService } from './calc.service';
import { IParamsToCalculate } from '../../interfaces/IParamsToCalculate';
import { Validator } from './calc.validator';
export class CalculatorController {
  constructor(
    private app: Express.Application,
    private service: CalculatorService
  ) {
    this.calculateUnityPrice()
  }
  calculateUnityPrice() {
    this.app.post('/cdb/calculate-price', (req, res) => {
      const info = req.body as IParamsToCalculate;
      const erros = Validator.validate(info);
      if (erros.length) {
        return res.status(400).send(erros);
      }
      const result = this.service.calculateCDBValue(info);
      return res.send(result);
    });
  }
}
