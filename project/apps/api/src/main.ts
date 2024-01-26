/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { attachSwagger } from '@project/shared/helpers';
import { DocumentBuilder } from '@nestjs/swagger';
import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';
import { UserIdInterceptor } from './app/interceptors/userid.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RequestIdInterceptor());
  app.useGlobalInterceptors(new UserIdInterceptor());
  attachSwagger({
    app,
    DocumentBuilder: new DocumentBuilder()
      .setTitle('The «BFF» service')
      .setDescription('«BFF» service API')
      .setVersion('1.0'),
    swaggerCustomOptions: {
      customSiteTitle: '[BFF] Swagger UI',
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
