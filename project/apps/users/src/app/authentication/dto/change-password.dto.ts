import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @ApiProperty({
    description: 'User old password',
    example: 'qwerty',
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
