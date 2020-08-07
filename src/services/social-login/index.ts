import { Application } from 'express';
import { PassportStatic } from 'passport';
import { SocialLoginService } from './social-login.service';
import { SocialLoginController } from './social-login.controller';
export class SocialLogin {
  constructor(app: Application, passport: PassportStatic) {
    new SocialLoginService(passport);
    new SocialLoginController(app, passport);
  }
}
