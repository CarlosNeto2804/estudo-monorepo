import { IParamsToCalculate } from "../../interfaces/IParamsToCalculate";
/**
 * Valida corpo da requisição
 */
export class Validator {
    static validate(info: IParamsToCalculate): string[] {
      // caso a propriedade não exista será adicionado uma mensagem 
      // de retorno ao cliente
      const erros: string[] = [];
      if (!info.cdbRate) erros.push('Informe a taxa do CDB!');
      if (!info.investmentDate) erros.push('Informe a data do investimento!');
      if (!info.currentDate) erros.push('Informe a data limite!');
      return erros;
    }
  }