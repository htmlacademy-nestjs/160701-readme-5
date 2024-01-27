import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

interface attachSwagger {
  app: INestApplication;
  DocumentBuilder: DocumentBuilder;
  pathsToRemove?: string[];
  swaggerCustomOptions?: SwaggerCustomOptions;
  documentOptions?: any;
}

export const attachSwagger = ({
  app,
  DocumentBuilder,
  pathsToRemove = [],
  swaggerCustomOptions,
  documentOptions,
}: attachSwagger) => {
  const config = DocumentBuilder.build();

  const document = SwaggerModule.createDocument(app, config, documentOptions);

  pathsToRemove.forEach((path) => delete document.paths[path]);

  SwaggerModule.setup('spec', app, document, swaggerCustomOptions);
};

export const AuthKeyName = 'access-token';
