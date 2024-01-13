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
}

export const attachSwagger = ({
  app,
  DocumentBuilder,
  pathsToRemove = [],
  swaggerCustomOptions,
}: attachSwagger) => {
  const config = DocumentBuilder.build();

  const document = SwaggerModule.createDocument(app, config);

  pathsToRemove.forEach((path) => delete document.paths[path]);

  SwaggerModule.setup('spec', app, document, swaggerCustomOptions);
};
