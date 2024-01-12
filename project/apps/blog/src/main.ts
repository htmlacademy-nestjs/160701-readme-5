/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('The «Blog» service')
    .setDescription('«Blog» service API')
    .setVersion('1.0')
    .addTag('posts', 'Публикаций')
    .addTag('likes', 'Лайки')
    .addTag('comments', 'Комментарии')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const pathsToRemove = ['/api/v1'];
  pathsToRemove.forEach((path) => delete document.paths[path]);

  SwaggerModule.setup('spec', app, document, {
    customSiteTitle: '[Blog] Swagger UI',
  });

  const port = process.env.PORT || 4444;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
