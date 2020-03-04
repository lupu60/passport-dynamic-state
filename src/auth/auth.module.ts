import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './facebook.strategy';
import passport = require('passport');

const facebookStrategyConfigFactory = {
    provide: 'FACEBOOK_STRATEGY_CONFIG',
    useFactory: (configService: ConfigService) => {
        return {
            clientID: `${configService.get('FACEBOOK_CLIENT_ID')}`,
            clientSecret: `${configService.get('FACEBOOK_CLIENT_SECRET')}`,
            callbackURL: `${configService.get('FACEBOOK_OAUTH_REDIRECT_URI')}/callback`,
            profileFields: ['id', 'displayName', 'link', 'photos', 'emails', 'name'],
            passReqToCallback: true,
        };
    },
    inject: [ConfigService],
};

@Module({
    controllers: [AuthController],
    providers: [facebookStrategyConfigFactory, FacebookStrategy],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {

        const facebookLoginOptions = {
            session: false,
            scope: ['email'],
            state: null,
        };
        consumer
            .apply((req: any, res: any, next: () => void) => {
                const {
                    query: { state },
                } = req;
                facebookLoginOptions.state = state;
                next();
            }, passport.authenticate('facebook', facebookLoginOptions))
            .forRoutes('auth/facebook/*');
    }
}
