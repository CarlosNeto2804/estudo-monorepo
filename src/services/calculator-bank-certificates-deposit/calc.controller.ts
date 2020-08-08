import {Application} from 'express';
import { CalculatorService } from './calc.service';
import { IParamsToCalculate } from '../../interfaces/IParamsToCalculate';
import { Validator } from './calc.validator';
/**
   * Habilita end point para consulta
   */
export class CalculatorController {
  /**
   * Habilita end point para consulta
   */
  constructor(
    private app: Application,
    private service: CalculatorService
  ) {
    this.startRoute()
  }
  /**
   * Inicia rota para calculo
   */
  private startRoute() {
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
