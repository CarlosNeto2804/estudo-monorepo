
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
/**
 * @description Ferramenta/Utilitário que gerencia as variáveis de ambiente
 */
export class ConfigEnvVars {
  private readonly envConfig: Record<string, string>;
  /**
   * @param pth - caminho do arquivo para as variaveis de ambiente.
   */
  constructor(pth:string = null) {
    const path_resolved:string = pth ? pth : this.get_path()
    this.envConfig = dotenv.parse(fs.readFileSync(path_resolved))
  }
  private get_path() {
    return `${path.join(__dirname, '../../configurations', process.env.NODE_ENV)}/.env`;
  }
  /**
   * @param key nome da variável de ambiente
   */
  get(key: string): string {
    return this.envConfig[key];
  }
}

export default new ConfigEnvVars()