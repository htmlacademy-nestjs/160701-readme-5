import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from './authentication.constants';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: 6,
    maxLength: 12,
  })
  @MinLength(6)
  @MaxLength(12)
  public password!: string;
}
