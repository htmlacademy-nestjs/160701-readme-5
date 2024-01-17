import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './app.config';
import mongoConfig from './mongo.config';

const ENV_USERS_FILE_PATH = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрузки
      load: [applicationConfig, mongoConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class ConfigUsersModule {}
