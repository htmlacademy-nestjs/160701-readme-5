import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ChangePasswordRdo {
  @Expose()
  @ApiProperty({
    description: 'User password message',
    example: 'Password changed successfully',
  })
  public message!: string;
}
