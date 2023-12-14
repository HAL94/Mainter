import { Controller, HttpCode, HttpStatus, Post, Param } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import startSeed from './seed';
import { handleApiError } from './common/handle-error';
import { Public } from './common/decorators';

@Controller('/')
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Post('/seed/:appId')
  @HttpCode(HttpStatus.OK)
  async seed(@Param() appId: string) {
    try {
      await startSeed(this.prisma, appId);
    } catch (error) {
      return handleApiError(error);
    }
  }
}
