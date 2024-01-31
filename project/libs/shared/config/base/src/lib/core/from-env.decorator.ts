import 'reflect-metadata';

export const FromEnv = (env: string) => (target: any, propertyKey: string) => {
  Reflect.defineMetadata('ENV_NAME', env, target, propertyKey);

  let defaultValue: any = undefined;
  Object.defineProperty(target, propertyKey, {
    get() {
      const reflectedType = Reflect.getMetadata(
        'design:type',
        target,
        propertyKey
      );
      let value = process.env[env] || defaultValue;
      if (value !== undefined) {
        value = reflectedType(value);
      }

      return value;
    },
    set(v: any) {
      defaultValue = v;
    },
  });
};
