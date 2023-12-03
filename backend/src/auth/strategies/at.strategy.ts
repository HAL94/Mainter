import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { jwtCookieExtractor } from 'src/utils/jwt-cookie-extractor';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtCookieExtractor('at')]),
      secretOrKey: config.get<string>('AT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    console.log('payload', payload);
    const app = await this.prisma.app.findUnique({
      where: { userId: payload.sub },
    });

    if (!app) throw new ForbiddenException('Access Denied');

    payload.appId = app.id;

    return payload;
  }
}
