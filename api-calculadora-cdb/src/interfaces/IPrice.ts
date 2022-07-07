/**
 * Interface de uso para objeto de calculo do CDB
 */
export interface IPrice {
  sSecurityName: string;
  dtDate: string;
  dLastTradePrice: number;
}
/**
 * Preço calculado
 */
export interface PriceCalculated {
  date: string;
  unitPrice: string;
}
