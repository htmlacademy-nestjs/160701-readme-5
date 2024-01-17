import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';

export class TextPostContent extends BasePostContent {
  @Expose()
  @ApiProperty({
    description: 'Text title',
    example: 'Lorem title',
  })
  title!: string;

  @ApiProperty({
    description: 'Text annotation',
    example: 'Lorem ipsum',
  })
  @Expose()
  annotation!: string;

  @Expose()
  @ApiProperty({
    description: 'Content annotation',
    example: 'Lorem ipsum',
  })
  content!: string;
}
