import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PhotoPostContent extends BasePostContent {
  @Expose()
  @ApiProperty({
    description: 'Photo image url path',
    example: '/static/image.jpg',
  })
  imageId!: string;
}
