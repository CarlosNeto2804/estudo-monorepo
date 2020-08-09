import * as fs from 'fs';
import read from './LoaderCSV';

interface Connecion<T> {
  message: string;
  connected: boolean;
  status: number;
  content: T[];
}

export class DataBase<T> {
  constructor() {}
  public store: T[];
  public connect(cb = (el: T) => {}): Promise<Connecion<T>> {
    return new Promise((resolve, reject) => {
      const results: T[] = [];
      fs.createReadStream('cdi_prices.csv')
        .pipe(read())
        .on('error', (err) => reject(err))
        .on('data', (data: T) => results.push(data))
        .on('end', () => {
          this.store = results;
          this.store.forEach(cb);
          resolve({
            message: 'DataSet lido com sucesso',
            connected: true,
            status: 200,
            content: results,
          });
        });
    });
  }
}

