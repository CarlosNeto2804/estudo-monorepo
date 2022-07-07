import * as path from 'path';
import { Application } from 'express';
import { PassportStatic } from 'passport';
import { ConfigEnvVars } from '../../config';
import { SocialLogintRoutes } from './social-login-routes';
import { SocialLoginService } from './social-login.service';
import { SocialLoginController } from './social-login.controller';
/**
 * Serviço para realizar autenticação dos usuários
 * - Utiliza a lib Passport JS
 * - Possui Autenticação com:
 * - Google
 * - Facebook
 */
export class SocialLogin {
  /**
   * Serviço para realizar autenticação dos usuários
   * - Utiliza a lib Passport JS
   * - Possui Autenticação com:
   * - Google
   * - Facebook
   */
  constructor(app: Application, passport: PassportStatic) {
    const config = this.createConfig();
    new SocialLoginService(passport, config);
    const controller = new SocialLoginController(passport, config);
    new SocialLogintRoutes(app, controller);

  }
  /**
   * Cria Config para utilizar as variaveis de ambiente
   */
  private createConfig() {
    const dir = path.join(
      __dirname,
      '../../../configurations',
      process.env.NODE_ENV
    );
    const filePath = `${dir}/.env.auth`;
    return new ConfigEnvVars(filePath);
  }
}
