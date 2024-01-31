import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, mongoConfig } from '@project/config-base';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig],
      envFilePath: 'apps/blog/.env',
    }),
  ],
})
export class BlogConfigModule {}
