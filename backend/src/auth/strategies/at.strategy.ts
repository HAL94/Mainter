import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { jwtCookieExtractor } from 'src/utils/jwt-cookie-extractor';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtCookieExtractor('at')]),
      secretOrKey: config.get<string>('AT_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    console.log('payload', payload);
    return payload;
  }
}
