import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';

export class VideoPostContent extends BasePostContent {
  @ApiProperty({
    description: 'Video title',
    example: 'Lorem ipsum',
  })
  @Expose()
  title!: string;

  @ApiProperty({
    description: 'Valid url link',
    example: 'https://youtu.be/s9v9wv9sv',
  })
  @Expose()
  url!: string;
}
