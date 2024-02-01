import { ApiProperty } from '@nestjs/swagger';
import { User } from '@project/validation';
import { MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: '123456',
    minLength: User.password.Min,
    maxLength: User.password.Max,
  })
  @MinLength(User.password.Min)
  @MaxLength(User.password.Max)
  public oldPassword!: string;

  @ApiProperty({
    description: 'User new password',
    example: 'qwertynew',
    minLength: User.password.Min,
    maxLength: User.password.Max,
  })
  @MinLength(User.password.Min)
  @MaxLength(User.password.Max)
  public newPassword!: string;
}
