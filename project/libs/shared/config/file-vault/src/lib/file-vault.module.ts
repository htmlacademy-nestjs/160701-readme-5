import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appFileVaultConfig } from './app.config';
import { mongoConfig } from '@project/config-base';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appFileVaultConfig, mongoConfig],
      envFilePath: 'apps/file-vault/.env',
    }),
  ],
})
export class FileVaultConfigModule {}
