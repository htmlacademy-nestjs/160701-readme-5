import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from '../post.rdo';
import { QuotePostContent } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class QuotePostRdo extends PostRdo {
  @Expose()
  @ApiProperty({
    type: QuotePostContent,
    description: 'Post Content',
  })
  public content!: QuotePostContent;
}
