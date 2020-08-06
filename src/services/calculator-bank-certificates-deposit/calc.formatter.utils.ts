export class CalculatorFormatter {
  public constructor() {}

  public completeDecimalPlaces(value: number, casas: number): any {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas,
    });
  }
  public customRound(num = 0, places = 0): number {
    const strNum: string = `${num}`;
    if (!strNum.includes('e')) {
      const value: number = this.parseToNumber(`${num}e+${places}`);
      return +(Math.round(value) + `e-${places}`);
    } else {
      const arr = strNum.split('e');
      const check = (n, places = 0) => +n + places > 0;
      const sig = check(arr[1], places) ? '+' : '';
      return this.formatter(arr[0], arr[1], sig, places);
    }
  }

  public decimalAdjust(value, exp): number {
    value = +value;
    exp = +exp;
    value = value.toString().split('e');
    value = Math.ceil(+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  private formatter(n1, n2, sig, places): number {
    const part_one = this.parseToNumber(`${+n1}e${sig}${+n2 + places}`);
    const part_two = `e-${places}`;
    return +(Math.round(part_one) + part_two);
  }
  private parseToNumber(value: string): number {
    const to_unknown = value as unknown;
    const response = to_unknown as number;
    return response;
  }
}
