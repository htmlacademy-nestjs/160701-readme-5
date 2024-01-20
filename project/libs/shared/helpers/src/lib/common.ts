import { ClassTransformOptions, plainToInstance } from 'class-transformer';

type PlainObject = Record<string, unknown>;

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

interface configMongo {
  username?: string;
  password?: string;
  host?: string;
  port?: string;
  databaseName?: string;
  authDatabase?: string;
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}: configMongo): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

interface configRabbitMQ {
  user?: string;
  password?: string;
  host?: string;
  port?: string;
}
export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}: configRabbitMQ): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}
