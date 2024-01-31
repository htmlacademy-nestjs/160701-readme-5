import { registerAs } from '@nestjs/config';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { FromEnv, configEnvValidator } from '@project/config-base';

const DEFAULT_SMTP_PORT = 25;

export class MailDto {
  @IsString()
  @FromEnv('MAIL_SMTP_HOST')
  public host!: string;

  @IsNumber()
  @FromEnv('MAIL_SMTP_PORT')
  public port: number = DEFAULT_SMTP_PORT;

  @IsString()
  @FromEnv('MAIL_USER_NAME')
  public user!: string;
  @IsString()
  @FromEnv('MAIL_USER_PASSWORD')
  public password!: string;

  @IsString()
  @IsEmail()
  @FromEnv('MAIL_FROM')
  public from!: string;
}

export const mailConfig = registerAs('mail', configEnvValidator(MailDto));
