import { IPrice, PriceCalculated } from '../../interfaces/IPrice';
import { CalculatorFormatter } from './calc.formatter.utils';
import { IParamsToCalculate } from '../../interfaces/IParamsToCalculate';
import { IDataBase } from '../../interfaces/IDataBase';
export class CalculatorService {
  constructor(
    private formatter: CalculatorFormatter,
    private db: IDataBase<IPrice>
  ) {}

  private tcdi(cdi = 0.0) {
    const res = Math.pow(cdi / 100 + 1, 1 / 252) - 1;
    return this.formatter.customRound(res, 8);
  }

  private calcular(valores: IPrice[], cdbRate: number): PriceCalculated[] {
    const response: PriceCalculated[] = [];
    let produtorio = this.formatter.completeDecimalPlaces(1, 16);
    for (const valor of valores) {
      const tcdi_k = this.tcdi(valor.dLastTradePrice);
      const calc = 1 + (tcdi_k * cdbRate) / 100;
      const res = this.formatter.completeDecimalPlaces(calc, 16);
      produtorio = this.formatter.completeDecimalPlaces(produtorio * res, 16);
      const arredondado = this.formatter.decimalAdjust(produtorio, -14);
      const valor_final = this.formatter.completeDecimalPlaces(arredondado, 16);
      response.push({
        date: valor.dtDate,
        unitPrice: this.unitPriceTCDB(valor_final),
      });
    }

    return response;
  }

  private unitPriceTCDB(tcdi_acc, init = 1000) {
    const parsed = this.formatter.decimalAdjust(tcdi_acc, -8);
    return this.formatter.completeDecimalPlaces(parsed * init, 8).replace(',',"");
  }
  private sortArray(a: IPrice, b: IPrice) {
    const d1 = new Date(a.dtDate).getTime();
    const d2 = new Date(b.dtDate).getTime();
    return d1 - d2;
  }

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
