import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from '../post.rdo';
import { TextPostContent } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class TextPostRdo extends PostRdo {
  @Expose()
  @ApiProperty({
    type: TextPostContent,
    description: 'Post Content',
  })
  public content!: TextPostContent;
}
