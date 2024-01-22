import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoConfig from './mongo.config';
import fileVaultConfig from './app.config';

const ENV_FILE_PATH = 'apps/file-vault/file-vault.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileVaultConfig, mongoConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class FileVaultConfigModule {}
