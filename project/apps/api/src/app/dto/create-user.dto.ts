import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@project/dto';

export class CreateUserDtoWithAvatarFile extends CreateUserDto {
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
