import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import startSeed from './seed';
import { handleApiError } from './common/handle-error';
import { Public } from './common/decorators';

@Controller('/')
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Post('/seed')
  @HttpCode(HttpStatus.OK)
  async seed() {
    try {
      await startSeed(this.prisma);
    } catch (error) {
      return handleApiError(error);
    }
  }
}
