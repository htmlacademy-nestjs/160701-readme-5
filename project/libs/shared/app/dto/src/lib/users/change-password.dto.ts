import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: '123456',
    minLength: 6,
    maxLength: 12,
  })
  @MinLength(6)
  @MaxLength(12)
  public oldPassword!: string;

  @ApiProperty({
    description: 'User new password',
    example: 'qwertynew',
    minLength: 6,
    maxLength: 12,
  })
  @MinLength(6)
  @MaxLength(12)
  public newPassword!: string;
}
