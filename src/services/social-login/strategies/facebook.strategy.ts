import { PassportStatic } from 'passport';
import { Strategy } from 'passport-facebook';
import { ConfigEnvVars } from '../../../config';
export class FacebookStrategy {
  constructor(passport: PassportStatic, config: ConfigEnvVars) {
    passport.use(
      new Strategy(
        {
          clientID: config.get('FACEBOOK_CLIENT_ID'),
          clientSecret: config.get('FACEBOOK_CLIENT_SECRET'),
          callbackURL: config.get('FACEBOOK_URL_CB'),
          profileFields: [
            'id',
            'displayName',
            'name',
            'emails',
            'gender',
            'picture.type(large)',
          ],    
        },
        (accessToken, refreshToken, profile, done) => done(null, profile)
      )
    );
  }
}
