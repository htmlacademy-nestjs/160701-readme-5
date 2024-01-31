import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PhotoPostContent extends BasePostContent {
  @Expose()
  @ApiProperty({
    description: 'Photo image ID',
    example: '65b809b8d6443b043b33eedb',
  })
  imageId!: string;
}
