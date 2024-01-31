import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mailConfig } from './mail.config';
import { appConfig, mongoConfig, rabbitConfig } from '@project/config-base';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, rabbitConfig, mongoConfig, mailConfig],
      envFilePath: 'apps/notify/.env',
    }),
  ],
})
export class NotifyConfigModule {}
