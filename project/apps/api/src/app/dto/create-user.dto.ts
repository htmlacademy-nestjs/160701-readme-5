import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto as BaseDto } from '@project/dto';

export class CreateUserDto extends BaseDto {
  @ApiProperty({
    required: false,
    description: 'User profile picture PNG or JPG file',
    type: 'string',
    format: 'binary',
    enum: ['image/png', 'image/jpeg'],
    maxLength: 100,
  })
  public avatar?: any;
}
