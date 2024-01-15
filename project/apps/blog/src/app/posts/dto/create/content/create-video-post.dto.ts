import { VideoPostContent } from '@project/libs/shared/app/types';
import { CreatePostDto } from '../create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoPostDto extends CreatePostDto {
  @ApiProperty({
    type: VideoPostContent,
    description: 'Post content',
  })
  public content!: VideoPostContent;
}
