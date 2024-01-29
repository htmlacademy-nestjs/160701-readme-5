import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3002;
const DEFAULT_MONGO_PORT = 27017;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface BlogConfig {
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
});

function validateConfig(config: BlogConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Blog Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): BlogConfig {
  const config: BlogConfig = {
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
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
