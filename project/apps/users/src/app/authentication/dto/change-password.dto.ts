import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @ApiProperty({
    description: 'User old password',
    example: 'qwerty',
  })
  public oldPassword!: string;

  @ApiProperty({
    description: 'User new password',
    example: 'qwertynew',
  })
  public newPassword!: string;
}
