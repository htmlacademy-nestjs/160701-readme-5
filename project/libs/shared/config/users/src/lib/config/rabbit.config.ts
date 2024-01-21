import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export interface RabbitConfig {
  host: string;
  password: string;
  user: string;
  queue: string;
  exchange: string;
  port: number;
}

const validationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
  user: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
});

function validateConfig(config: RabbitConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Rabbit Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): RabbitConfig {
  const config: RabbitConfig = {
    host: String(process.env.RABBIT_HOST),
    password: String(process.env.RABBIT_PASSWORD),
    port: parseInt(
      process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(),
      10
    ),
    user: String(process.env.RABBIT_USER),
    queue: String(process.env.RABBIT_QUEUE),
    exchange: String(process.env.RABBIT_EXCHANGE),
  };

  validateConfig(config);
  return config;
}

export default registerAs('rabbit', getConfig);
