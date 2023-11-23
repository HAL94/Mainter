import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtPayloadWithRt, Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RtGuard)
  async me(@GetCurrentUser() payload: Partial<JwtPayloadWithRt>) {
    delete payload.refreshToken;
    return {
      ...payload,
      success: true,
    };
  }

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto): Promise<any> {
    await this.authService.signupLocal(dto);

    return {
      success: true,
      message: 'Successfully signed-up',
    };
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: AuthDto,
    @Response() res: any,
  ): Promise<Tokens | undefined> {
    try {
      const { access_token, refresh_token } =
        await this.authService.signinLocal(dto);

      await Promise.all([
        this.authService.setTokenCookie('at', res, access_token),
        this.authService.setTokenCookie('rt', res, refresh_token),
      ]);

      return res.json({
        success: true,
        message: 'successfully logged in',
      });
    } catch (error) {
      console.log('wrong', error);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Response() res: any): Promise<boolean> {
    this.authService.clearTokenCookie('at', res);
    this.authService.clearTokenCookie('rt', res);
    return res.json({
      success: true,
      message: 'Successfully Logged Out',
    });
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Response() res: any,
  ): Promise<Tokens> {
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(userId, refreshToken);

    await this.authService.setTokenCookie('at', res, access_token);
    await this.authService.setTokenCookie('rt', res, refresh_token);

    return res.json({
      success: true,
      message: 'refresh done!',
    });
  }
}
