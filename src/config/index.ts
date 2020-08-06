
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigEnvVars {
  private readonly envConfig: Record<string, string>;
  constructor(pth:string = null) {
    const path_resolved:string = pth ? pth : this.get_path()
    this.envConfig = dotenv.parse(fs.readFileSync(path_resolved))
  }
  private get_path() {
    return `${path.join(__dirname,'../..','configurations',process.env.NODE_ENV)}/.env`;
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}

export default new ConfigEnvVars()