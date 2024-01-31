/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { attachSwagger } from '@project/shared/helpers';
import { DocumentBuilder } from '@nestjs/swagger';
import {
  AllOptionPostContentArray,
  AllPostContentArray,
} from '@project/libs/shared/app/types';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  attachSwagger({
    app,
    DocumentBuilder: new DocumentBuilder()
      .setTitle('The «Blog» service')
      .setDescription('«Blog» service API')
      .setVersion('1.0')
      .addTag('posts', 'Публикации')
      .addTag('likes', 'Лайки')
      .addTag('comments', 'Комментарии'),
    swaggerCustomOptions: {
      customSiteTitle: '[Blog] Swagger UI',
    },
    documentOptions: {
      extraModels: [...AllPostContentArray, ...AllOptionPostContentArray],
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
