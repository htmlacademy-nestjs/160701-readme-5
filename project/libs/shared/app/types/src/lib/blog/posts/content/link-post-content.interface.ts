import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';

export class LinkPostContent extends BasePostContent {
  @ApiProperty({
    description: 'Valid url link',
    example: 'https://youtu.be/s9v9wv9sv',
  })
  @Expose()
  url!: string;

  @ApiProperty({
    description: 'Text',
    example: 'Lorem ipsum',
  })
  @Expose()
  description!: string;
}
