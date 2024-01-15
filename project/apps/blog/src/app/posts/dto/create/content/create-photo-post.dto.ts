import { PhotoPostContent } from '@project/libs/shared/app/types';
import { CreatePostDto } from '../create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    type: PhotoPostContent,
    description: 'Post content',
  })
  public content!: PhotoPostContent;
}
