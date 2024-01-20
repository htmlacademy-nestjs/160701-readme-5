import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3002;
const DEFAULT_MONGO_PORT = 27017;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_RABBIT_PORT = 5672;

type Environment = (typeof ENVIRONMENTS)[number];

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  };
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  }),
});

function validateConfig(config: NotifyConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Notify Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    db: {
      host: String(process.env.MONGO_HOST),
      port: parseInt(
        process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(),
        10
      ),
      name: String(process.env.MONGO_DB),
      user: String(process.env.MONGO_USER),
      password: String(process.env.MONGO_PASSWORD),
      authBase: String(process.env.MONGO_AUTH_BASE),
    },
    rabbit: {
      host: String(process.env.RABBIT_HOST),
      password: String(process.env.RABBIT_PASSWORD),
      port: parseInt(
        process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(),
        10
      ),
      user: String(process.env.RABBIT_USER),
      queue: String(process.env.RABBIT_QUEUE),
      exchange: String(process.env.RABBIT_EXCHANGE),
    },
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
