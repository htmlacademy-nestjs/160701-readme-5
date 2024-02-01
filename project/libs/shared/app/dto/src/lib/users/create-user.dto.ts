import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from './authentication.constants';
import { User } from '@project/validation';

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
    minLength: User.firstname.Min,
    maxLength: User.firstname.Max,
  })
  @MinLength(User.firstname.Min)
  @MaxLength(User.firstname.Max)
  @IsString()
  public firstname!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: User.password.Min,
    maxLength: User.password.Max,
  })
  @MinLength(User.password.Min)
  @MaxLength(User.password.Max)
  @IsString()
  public password!: string;

  @ApiProperty({
    required: false,
    description: 'User profile picture PNG or JPG file',
    type: 'string',
    format: 'binary',
    enum: User.avatar.Type,
    maxLength: User.avatar.FileMaxSize,
  })
  public avatar?: string;
}
