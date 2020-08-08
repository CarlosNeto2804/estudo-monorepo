import { IPrice, PriceCalculated } from '../../interfaces/IPrice';
import { CalculatorFormatter } from './calc.formatter.utils';
import { IParamsToCalculate } from '../../interfaces/IParamsToCalculate';
import { IDataBase } from '../../interfaces/IDataBase';

/**
 * Responsavél por executar os calculos envolvendo CDB
 */
export class CalculatorService {
  /**
   * Responsavél por executar os calculos envolvendo CDB
   */
  constructor(
    private formatter: CalculatorFormatter,
    private db: IDataBase<IPrice>
  ) {}

  /**
   * Calcula o valor do TCDI
   * - resultado contém 8 casas decimais de precisão
   */
  private tcdi(cdi = 0.0) {
    const res = Math.pow(cdi / 100 + 1, 1 / 252) - 1;
    return this.formatter.customRound(res, 8);
  }

  /**
   * - Executa o produtório da função (1 + (tcdi_k * cdbRate/100) )
   * - Ajusta casas decimais e arredonda
   * - Calcula o preço unitário
   * - Executa em o(n)
   */

  private calcular(valores: IPrice[], cdbRate: number): PriceCalculated[] {
    const response: PriceCalculated[] = [];
    let produtorio = this.formatter.completeDecimalPlaces(1, 16); //ajustar para 16 casas decimais
    for (const valor of valores) {
      const tcdi_k = this.tcdi(valor.dLastTradePrice); //calcula tdci
      const calc = 1 + (tcdi_k * cdbRate) / 100; //calcula a função principal
      const res = this.formatter.completeDecimalPlaces(calc, 16); // ajusta 16 casas decimais
      // acumula no produtório
      produtorio = this.formatter.completeDecimalPlaces(produtorio * res, 16);
      // arredonda o valor
      const arredondado = this.formatter.decimalAdjust(produtorio, -14);
      // ajusta 16 casas decimais
      const valor_final = this.formatter.completeDecimalPlaces(arredondado, 16);
      // adiciona a coleção de resposta
      response.push({
        date: valor.dtDate,
        unitPrice: this.unitPriceTCDB(valor_final),
      });
    }

    return response;
  }

  private unitPriceTCDB(tcdi_acc, init = 1000) {
    // ajusta o valor da resposta em 8 casas e arredonda
    const parsed = this.formatter.decimalAdjust(tcdi_acc, -8);
    return this.formatter
      .completeDecimalPlaces(parsed * init, 8) // multiplica pelo preço base 
      .replace(',', ''); // remove a ',' para termos de 1,000.00 -> 1000.00
  }
  
  private sortArray(a: IPrice, b: IPrice) {
    const d1 = new Date(a.dtDate).getTime();
    const d2 = new Date(b.dtDate).getTime();
    return d1 - d2;
  }
  /**
   * - Filtra as datas para a execução do calculo
   * - ordena valores de forma crescente
   */
  private filterPricesByDate(info: IParamsToCalculate): IPrice[] {
    const values = this.db.store.filter((d) => {
      return (
        new Date(d.dtDate) >= new Date(info.investmentDate) &&
        new Date(d.dtDate) < new Date(info.currentDate)
      );
    });
    return values.sort(this.sortArray);
  }

  public calculateCDBValue(info: IParamsToCalculate): PriceCalculated[] {
    const rates = this.filterPricesByDate(info);
    return this.calcular(rates, info.cdbRate);
  }
}
