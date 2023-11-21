import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  
  const configService = app.get(ConfigService);
  
  const origin = configService.get('ORIGIN');
  
  app.enableCors(
    {
      credentials: true,
      origin
    }
  );

  const config = new DocumentBuilder()
    .setTitle('Azazil example')
    .setDescription('The azazil API description')
    .setVersion('1.0')
    .addTag('Azazil')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
