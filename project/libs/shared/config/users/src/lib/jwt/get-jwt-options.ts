import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export function getJwtOptions(
  prefix: string,
  configService: ConfigService
): JwtModuleOptions {
  return {
    secret: configService.get<string>(`jwt.${prefix}TokenSecret`),
    signOptions: {
      expiresIn: configService.get<string>(`jwt.${prefix}TokenExpiresIn`),
      algorithm: 'HS256',
    },
  };
}
