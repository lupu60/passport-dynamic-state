import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import passport = require('passport');
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  private readonly logger = new Logger(FacebookStrategy.name);

  constructor(
    @Inject('FACEBOOK_STRATEGY_CONFIG')
    private readonly facebookStrategyConfig,
  ) {
    super(
      facebookStrategyConfig,
      async (
        request: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done,
      ) => {
        this.logger.log(profile);

        // take the state from the request query params
        const { state } = request.query;
        this.logger.log(state);

        // register user

        // return callback
        return done(null, profile);
      },
    );
    passport.use(this);
  }
}
