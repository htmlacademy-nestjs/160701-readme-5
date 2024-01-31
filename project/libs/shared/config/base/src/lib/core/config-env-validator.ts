import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { validateSync } from 'class-validator';
import { ValidationError } from 'class-validator';
import 'reflect-metadata';

class ValidateError extends Error {
  constructor(private config: object, private errors: ValidationError[]) {
    const result = errors.map((error) => {
      const envName = Reflect.getMetadata('ENV_NAME', config, error.property);
      const property = envName ? `Env: "${envName}"` : error.property;

      return `${property}: ${
        error.constraints
          ? Array.from(Object.values(error.constraints)).join(', ')
          : 'error'
      }`;
    });
    super(result.join(`\n`));
  }
}

export const configEnvValidator = (dto: Constructor<object>) => () => {
  const config = new dto();

  const errors = validateSync(config, {});
  if (errors.length) {
    throw new ValidateError(config, errors);
  }

  return config;
};
