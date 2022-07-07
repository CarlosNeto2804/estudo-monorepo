export class Log {
  constructor(private nameSpace: string = 'Log') {}
  public error(message: any) {
    this.print(1, message);
  }
  public success(message: any) {
    this.print(2, message);
  }
  public warn(message: any) {
    this.print(3, message);
  }
  public info(message: any) {
    this.print(4, message);
  }
  private print(key: number, message: any) {
    console.log(
      `\x1b[3${key}m`,
      `[${this.nameSpace}] -> ${message}`,
      `\x1b[39m`
    );
  }
}
