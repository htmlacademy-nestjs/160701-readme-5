import { TextPostContent } from '@project/libs/shared/app/types';
import { CreatePostDto } from '../create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTextPostDto extends CreatePostDto {
  @ApiProperty({
    type: TextPostContent,
    description: 'Post content',
  })
  public content!: TextPostContent;
}
