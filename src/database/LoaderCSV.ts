import { Transform } from 'stream';
interface Options {
  separator: number;
  newline: number;
  charReturn: number;
}
interface State {
  firstLine: boolean;
  lineNumber: number;
  previousEnd: number;
  rowLength: number;
}
class CsvParser extends Transform {
  private _prev: any = null;
  private headers: Array<any> = [];
  private state: State;
  private options: Options;
  constructor() {
    super({ objectMode: true, highWaterMark: 16 });
    this.state = this.getState();
    this.options = this.getOptions();
  }

  private getState() {
    return {
      firstLine: true,
      lineNumber: 0,
      previousEnd: 0,
      rowLength: 0,
    };
  }
  private getOptions() {
    const [newline] = Buffer.from('\n');
    const [separator] = Buffer.from(',');
    const [charReturn] = Buffer.from('\r');
    return { newline, separator, charReturn };
  }

  private parseLine(buffer: any, start: number, end: number) {
    const cells: Array<string> = [];
    const comma: number = this.options.separator;
    let end_line: number = end;
    end_line -= 1; // trim
    if (buffer.length && buffer[end_line - 1] === this.options.charReturn) {
      end_line -= 1;
    }

    let offset: number = start;
    for (let i = start; i < end_line; i++) {
      if (buffer[i] === comma) {
        const value: string = this.parseValue(buffer, offset, i);
        cells.push(value);
        offset = i + 1;
      }
    }
    if (offset < end_line) {
      const value: string = this.parseValue(buffer, offset, end_line);
      cells.push(value);
    }
    if (this.state.firstLine) return this.mapHeaders(cells);
    this.state.lineNumber += 1;
    this.parseToObject(cells);
  }

  private mapHeaders(cells: Array<any>) {
    this.state.firstLine = false;
    this.headers = cells.map((header) => header);
    this.emit('headers', this.headers);
    return;
  }

  parseValue(buffer: any, start: number, end: number): string {
    return buffer.toString('utf-8', start, end);
  }

  parseToObject(cells: Array<any>) {
    /**
     * nesse método é possível utilizar o metodo reduce,
     * o codigo fica reduzido, porém aumenta a quantidade de
     * instruções executadas.
     */
    const item = new Object();
    for (let i = 0; i < cells.length; i++) {
      const header = this.headers[i];
      item[header] = cells[i];
    }
    this.push(item);
  }
  // @Override
  _flush(callback: Function) {
    this.parseLine(this._prev, this.state.previousEnd, this._prev.length + 1);
    callback();
  }
  newLine(buffer: any, i: number) {
    this.parseLine(buffer, this.state.previousEnd, i + 1);
    this.state.previousEnd = i + 1;
    this.state.rowLength = 0;
  }
  // @Override
  _transform(data: any, _: string, callback: Function) {
    if (typeof data === 'string') {
      data = Buffer.from(data);
    }
    const buffer = data;
    for (let i = 0; i < buffer.length; i++) {
      const chr = buffer[i];
      this.state.rowLength += 1;
      if (chr === this.options.newline) this.newLine(buffer, i);
    }
    if (buffer.length - this.state.previousEnd < data.length) {
      this._prev = data;
      this.state.previousEnd -= buffer.length - data.length;
      return callback();
    }
    this._prev = buffer;
    callback();
  }
}
export default () => new CsvParser();
