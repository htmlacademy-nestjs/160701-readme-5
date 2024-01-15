import { QuotePostContent } from '@project/libs/shared/app/types';
import { CreatePostDto } from '../create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotePostDto extends CreatePostDto {
  @ApiProperty({
    type: QuotePostContent,
    description: 'Post content',
  })
  public content!: QuotePostContent;
}
