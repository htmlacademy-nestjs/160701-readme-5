import { LinkPostContent } from '@project/libs/shared/app/types';
import { CreatePostDto } from '../create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkPostDto extends CreatePostDto {
  @ApiProperty({
    type: LinkPostContent,
    description: 'Post content',
  })
  public content!: LinkPostContent;
}
