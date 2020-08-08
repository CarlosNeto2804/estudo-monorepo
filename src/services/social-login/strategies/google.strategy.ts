import { PassportStatic } from 'passport';
import { Strategy } from 'passport-google-oauth2';
import { ConfigEnvVars } from '../../../config';
/**
 * - Cria a estratégia de login com google
 * - Utilizando o protocolo oAuth2
 */
export class GoogleStrategy {
  /**
   * - Cria a estratégia de login com google
   * - Utilizando o protocolo oAuth2
   */
  constructor(passport: PassportStatic, config: ConfigEnvVars) {
    passport.use(
      new Strategy(
        {
          clientID: config.get('GOOGLE_CLIENT_ID'),
          clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
          callbackURL: config.get('GOOGLE_URL_CB'),
          scope: ['profile', 'email'],
        },
        (accessToken, refreshToken, profile, done) => done(null, profile)
      )
    );
  }
}
