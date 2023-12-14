import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { AtGuard } from './common/guards';
import { VehicleModule } from './vehicle/vehicle.module';
import { AppController } from './app.controller';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    }),
    AuthModule,
    PrismaModule,
    ClientModule,
    VehicleModule,
    JobModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
