import { Application } from 'express';
import { PassportStatic } from 'passport';
import { SocialLoginService } from './social-login.service';
import { SocialLoginController } from './social-login.controller';
/**
 * Serviço para realizar autenticação dos usuários
 */
export class SocialLogin {
  /**
   * Serviço para realizar autenticação dos usuários
   * - utiliza a lib Passport JS
   */
  constructor(app: Application, passport: PassportStatic) {
    new SocialLoginService(passport);
    new SocialLoginController(app, passport);
  }
}
