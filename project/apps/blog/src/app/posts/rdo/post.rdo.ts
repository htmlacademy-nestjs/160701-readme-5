import { ApiProperty } from '@nestjs/swagger';
import {
  Post,
  PostContent,
  PostStatus,
  PostType,
} from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class PostRdo implements Post {
  @Expose()
  @ApiProperty({
    description: 'The uniq post ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    enum: PostType,
    description: 'Post content type',
    example: PostType.Video,
  })
  public type!: PostType;

  @Expose()
  @ApiProperty({
    description: 'Create post date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Posted post date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public postedAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'The uniq author(user) ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public author!: string;

  @Expose()
  @ApiProperty({
    description: 'The uniq content ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public contentId!: string;

  @Expose()
  @ApiProperty({
    description: 'This post is repost',
    example: 'false',
  })
  public repost!: boolean;

  @Expose()
  @ApiProperty({
    enum: PostStatus,
    description: 'This post is repost',
    example: PostStatus.Draft,
    default: PostStatus.Public,
  })
  public status!: PostStatus;

  @Expose()
  @ApiProperty({
    description: 'This post tags',
    example: ['#hash'],
  })
  public tags?: string[];
}
