import { Controller, Get, HttpStatus, Inject, Param, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redirect } from '@nestjsplus/redirect';

@Controller('auth')
export class AuthController {
    @Inject('ConfigService')
    private readonly configService: ConfigService;

    @Get(':provider/callback')
    @Redirect()
    async socialCallback(@Req() req, @Param('provider') provider: string, @Query('state') state: string) {
        // here you can use the provider and the state
        return {
            statusCode: HttpStatus.FOUND,
            url: `${this.configService.get('FRONTEND_HOST')}/dashboard`,
        };
    }
}
