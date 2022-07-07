import { Application } from 'express';
import { SocialLoginController } from './social-login.controller';
import { PassportStatic, AuthenticateOptions } from 'passport';
export class SocialLogintRoutes {
  constructor(app: Application, controller: SocialLoginController) {
    app.get(
      '/social-login/google',
      controller.authenticate('google', { scope: ['profile', 'email'] })
    );
    app.get(
      '/social-login/google/callback',
      controller.authenticate('google', {}),
      controller.authCallback
    );

    app.get(
      '/social-login/facebook',
      controller.authenticate('facebook', { scope: ['email'] })
    );

    app.get(
      '/social-login/facebook/callback',
      controller.authenticate('facebook', {}),
      controller.authCallback
    );
  }
}
