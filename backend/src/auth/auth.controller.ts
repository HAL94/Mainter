import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtPayloadWithRt } from './types';
import { handleApiError } from 'src/common/handle-error';
import { Response } from 'express';
import AppResponse from 'src/common/app-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RtGuard)
  async me(
    @GetCurrentUser() payload: Partial<JwtPayloadWithRt>,
  ): Promise<AppResponse<Partial<JwtPayloadWithRt>>> {
    delete payload.refreshToken;
    return {
      data: { ...payload },
      success: true,
    };
  }

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto): Promise<AppResponse<null>> {
    try {
      await this.authService.signupLocal(dto);
      return {
        success: true,
        message: 'Successfully signed-up',
        data: null,
        error: null,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AppResponse<null>> {
    try {
      const { access_token, refresh_token } =
        await this.authService.signinLocal(dto);

      await Promise.all([
        this.authService.setTokenCookie('at', res, access_token),
        this.authService.setTokenCookie('rt', res, refresh_token),
      ]);

      return {
        success: true,
        message: 'Successfully LoggedIn',
        data: null,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): AppResponse<null> {
    try {
      this.authService.clearTokenCookie('at', res);
      this.authService.clearTokenCookie('rt', res);
      return {
        success: true,
        message: 'Successfully Logged Out',
        data: null,
        error: null,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AppResponse<null>> {
    try {
      const { access_token, refresh_token } =
        await this.authService.refreshTokens(userId, refreshToken);

      await this.authService.setTokenCookie('at', res, access_token);
      await this.authService.setTokenCookie('rt', res, refresh_token);

      return {
        success: true,
        message: 'refresh done!',
      };
    } catch (error) {
      return handleApiError(error);
    }
  }
}
