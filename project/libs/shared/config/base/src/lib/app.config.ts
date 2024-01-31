import { registerAs } from '@nestjs/config';
import { configEnvValidator, FromEnv } from '@project/config-base';
import { IsEnum, IsNumber, IsString } from 'class-validator';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export class BaseAppDto {
  @IsString()
  @IsEnum(ENVIRONMENTS)
  @FromEnv('NODE_ENV')
  environment!: string;

  @IsNumber()
  @FromEnv('PORT')
  port!: number;
}

export const appConfig = registerAs(
  'application',
  configEnvValidator(BaseAppDto)
);
