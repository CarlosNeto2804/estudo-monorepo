export class Log {
  constructor(private nameSpace: string) {}
  public error(message: any) {
    console.log(`\x1b[31m`, `[${this.nameSpace}] -> ${message}`, `\x1b[39m`);
  }
  public success(message: any) {
    console.log(`\x1b[32m`, `[${this.nameSpace}] -> ${message}`, `\x1b[39m`);
  }
  public warn(message: any) {
    console.log(`\x1b[33m`, `[${this.nameSpace}] -> ${message}`, `\x1b[39m`);
  }
  public info(message: any) {
    console.log(`\x1b[34m`, `[${this.nameSpace}] -> ${message}`, `\x1b[39m`);
  }
}
