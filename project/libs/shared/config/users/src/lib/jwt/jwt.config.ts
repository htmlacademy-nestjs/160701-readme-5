import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { FromEnv, configEnvValidator } from '@project/config-base';

export class JwtDto {
  @IsString()
  @FromEnv('JWT_ACCESS_TOKEN_SECRET')
  public accessTokenSecret!: string;

  @IsString()
  @FromEnv('JWT_ACCESS_TOKEN_EXPIRES_IN')
  public accessTokenExpiresIn!: string;

  @IsString()
  @FromEnv('JWT_REFRESH_TOKEN_SECRET')
  public refreshTokenSecret!: string;

  @IsString()
  @FromEnv('JWT_REFRESH_TOKEN_EXPIRES_IN')
  public refreshTokenExpiresIn!: string;
}

export const jwtConfig = registerAs('jwt', configEnvValidator(JwtDto));
