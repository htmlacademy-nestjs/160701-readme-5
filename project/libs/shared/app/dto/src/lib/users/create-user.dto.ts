import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from './authentication.constants';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
    minLength: 3,
    maxLength: 50,
  })
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  public firstname!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: 6,
    maxLength: 12,
  })
  @MinLength(6)
  @MaxLength(12)
  @IsString()
  public password!: string;

  @ApiProperty({
    required: false,
    description: 'User profile picture PNG or JPG file',
    type: 'string',
    format: 'binary',
    enum: ['image/png', 'image/jpeg'],
    maxLength: 100,
  })
  public avatar?: string;
}
