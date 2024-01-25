import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getJwtOptions } from './get-jwt-options';

export const JWT_ACCESS_KEY = 'jwtAccessToken';
export const JWT_REFRESH_KEY = 'jwtRefreshToken';

export class JwtCofigModule {
  static register(): DynamicModule {
    return {
      module: JwtCofigModule,
      providers: [
        {
          provide: JWT_ACCESS_KEY,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            new JwtService(getJwtOptions('access', configService)),
        },
        {
          provide: JWT_REFRESH_KEY,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            new JwtService(getJwtOptions('refresh', configService)),
        },
      ],
      exports: [JWT_ACCESS_KEY, JWT_REFRESH_KEY],
    };
  }
}
