import { IParamsToCalculate } from "../../interfaces/IParamsToCalculate";
export class Validator {
    static validate(info: IParamsToCalculate): string[] {
      const erros: string[] = [];
      if (!info.cdbRate) erros.push('Informe a taxa do CDB!');
      if (!info.investmentDate) erros.push('Informe a data do investimento!');
      if (!info.currentDate) erros.push('Informe a data limite!');
      return erros;
    }
  }