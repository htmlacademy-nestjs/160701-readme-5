import { registerAs } from '@nestjs/config';
import { BaseAppDto, FromEnv, configEnvValidator } from '@project/config-base';
import { IsString } from 'class-validator';

class AppDto extends BaseAppDto {
  @IsString()
  @FromEnv('UPLOAD_DIRECTORY_PATH')
  uploadDirectory: string = '/uploads';

  @IsString()
  @FromEnv('SERVE_ROOT')
  serveRoot: string = '/static';
}

export const appFileVaultConfig = registerAs(
  'application',
  configEnvValidator(AppDto)
);
