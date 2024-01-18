import { ConfigService } from '@nestjs/config';

export async function getJwtOptions(configService: ConfigService) {
  return {
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    },
  };
}
