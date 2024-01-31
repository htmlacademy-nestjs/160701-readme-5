import { registerAs } from '@nestjs/config';
import { IsNumber, IsString } from 'class-validator';
import { FromEnv } from './core/from-env.decorator';
import { configEnvValidator } from './core/config-env-validator';

export class RabbitDto {
  @IsString()
  @FromEnv('RABBIT_HOST')
  host!: string;

  @IsString()
  @FromEnv('RABBIT_PASSWORD')
  password!: string;

  @IsString()
  @FromEnv('RABBIT_USER')
  user!: string;

  @IsNumber()
  @FromEnv('RABBIT_PORT')
  port!: number;

  @IsString()
  @FromEnv('RABBIT_QUEUE')
  queue!: string;

  @IsString()
  @FromEnv('RABBIT_EXCHANGE')
  exchange!: string;
}

export const rabbitConfig = registerAs('rabbit', configEnvValidator(RabbitDto));
