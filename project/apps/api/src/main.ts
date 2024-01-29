/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AuthKeyName, attachSwagger } from '@project/shared/helpers';
import { DocumentBuilder } from '@nestjs/swagger';
import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';
import { UserIdInterceptor } from './app/interceptors/userid.interceptor';
import {
  AllOptionPostContentArray,
  AllPostContentArray,
} from '@project/libs/shared/app/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RequestIdInterceptor());
  app.useGlobalInterceptors(new UserIdInterceptor());
  attachSwagger({
    app,
    DocumentBuilder: new DocumentBuilder()
      .setTitle('The «BFF» service')
      .setDescription('«BFF» service API')
      .setVersion('1.0')
      .addBearerAuth(
        {
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        AuthKeyName
      ),
    swaggerCustomOptions: {
      customSiteTitle: '[BFF] Swagger UI',
    },
    documentOptions: {
      extraModels: [...AllPostContentArray, ...AllOptionPostContentArray],
    },
  });

  const port = process.env.PORT || 3777;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
