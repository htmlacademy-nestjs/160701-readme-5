import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from '../post.rdo';
import { PhotoPostContent } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class PhotoPostRdo extends PostRdo {
  @Expose()
  @ApiProperty({
    type: PhotoPostContent,
    description: 'Post Content',
  })
  public content!: PhotoPostContent;
}
