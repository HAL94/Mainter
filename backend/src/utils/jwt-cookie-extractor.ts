import { Request } from 'express';

export const jwtCookieExtractor =
  (tokenType: 'rt' | 'at') => (req: Request) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies[tokenType];
    }
    return token;
  };
