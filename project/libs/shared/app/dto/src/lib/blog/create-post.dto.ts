import { ApiProperty } from '@nestjs/swagger';
import {
  PostContent,
  PostType,
  RefPostContentArray,
} from '@project/libs/shared/app/types';

export class CreatePostDto {
  @ApiProperty({
    description: 'Author id',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public author!: string;

  @ApiProperty({
    enum: PostType,
    description: 'Post type',
    example: PostType.Video,
  })
  public type!: PostType;

  @ApiProperty({
    description: 'Post hash tags',
    example: ['#hash'],
  })
  public tags!: string[];

  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefPostContentArray,
  })
  public content!: PostContent;
}
