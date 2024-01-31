import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '@project/config-base';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: 'apps/api/.env',
    }),
  ],
})
export class ApiConfigModule {}
