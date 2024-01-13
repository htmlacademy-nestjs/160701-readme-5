/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { attachSwagger } from '@project/shared/helpers';
import { DocumentBuilder } from '@nestjs/swagger';

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
      .addTag('posts', 'Публикаций')
      .addTag('likes', 'Лайки')
      .addTag('comments', 'Комментарии'),
    pathsToRemove: ['/api/v1'],
    swaggerCustomOptions: {
      customSiteTitle: '[Blog] Swagger UI',
    },
  });

  const port = process.env.PORT || 4444;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
