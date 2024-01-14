import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';
import { VideoPostContent } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class VideoPostRdo extends PostRdo {
  @Expose()
  @ApiProperty({
    type: VideoPostContent,
    description: 'Post Content',
  })
  public content!: VideoPostContent;
}
