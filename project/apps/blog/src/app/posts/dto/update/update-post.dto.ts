import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from '@project/dto';
import {
  PostContent,
  RefOptionalPostContentArray,
} from '@project/libs/shared/app/types';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefOptionalPostContentArray,
  })
  public content!: PostContent;
}
