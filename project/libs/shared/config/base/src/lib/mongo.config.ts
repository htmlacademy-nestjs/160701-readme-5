import { registerAs } from '@nestjs/config';
import { configEnvValidator, FromEnv } from '@project/config-base';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export const MIN_PORT = 0;
export const MAX_PORT = 65535;

export class MongoDto {
  @IsString()
  @FromEnv('MONGO_HOST')
  host!: string;

  @IsNumber()
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @FromEnv('MONGO_PORT')
  port!: number;

  @IsString()
  @FromEnv('MONGO_DB')
  name!: string;

  @IsString()
  @FromEnv('MONGO_USER')
  user!: string;

  @IsString()
  @FromEnv('MONGO_PASSWORD')
  password!: string;

  @IsString()
  @FromEnv('MONGO_AUTH_BASE')
  authBase!: string;
}

export const mongoConfig = registerAs('db', configEnvValidator(MongoDto));
