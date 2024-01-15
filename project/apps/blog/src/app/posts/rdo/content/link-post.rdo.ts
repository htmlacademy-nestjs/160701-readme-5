import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from '../post.rdo';
import { LinkPostContent } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class LinkPostRdo extends PostRdo {
  @Expose()
  @ApiProperty({
    type: LinkPostContent,
    description: 'Post Content',
  })
  public content!: LinkPostContent;
}
