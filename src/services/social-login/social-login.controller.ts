import { Application, Request, Response } from 'express';
import { PassportStatic, AuthenticateOptions } from 'passport';
import axios from 'axios'
interface AuthOptions {
  failureRedirect?: string;
  successRedirect?: string;
  scope?: string[];
}
export class SocialLoginController {
  constructor(private app: Application, public passport: PassportStatic) {
    this.app.get(
      '/social-login/google',
      this.authenticate('google', { scope: ['profile', 'email'] })
    );

    this.app.get(
      '/social-login/google/callback',
      this.authenticate('google', { failureRedirect: '', successRedirect: '' }),
      (req, res) => res.send(req.user)
    );
  }
  private authenticate(strategy: string, opt: AuthOptions) {
    const opt_parsed = opt as AuthenticateOptions;
    return this.passport.authenticate(strategy, opt_parsed);
  }
}
