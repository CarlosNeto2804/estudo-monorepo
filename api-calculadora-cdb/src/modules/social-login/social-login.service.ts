import * as path from 'path';
import Passport from 'passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { ConfigEnvVars } from '../../config/index';
export class SocialLoginService {
  constructor(public passport: Passport.PassportStatic, config: ConfigEnvVars) {
   this.serialize()
   this.deserialize()
   this.createStrategies(config)
  }
  
  /**
   * Inicia as Estratégias de login
   * - Google
   * - Facebook
   */
  private createStrategies(configEnv: ConfigEnvVars){
    new GoogleStrategy(this.passport, configEnv);
    new FacebookStrategy(this.passport, configEnv);
  }
  
  private serialize() {
    this.passport.serializeUser((user: any, done) => done(null, user));
  }
  private deserialize() {
    this.passport.deserializeUser((obj:any, done) => done(null, obj));
  }
}
