import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class CommentRdo implements Comment {
  @Expose()
  @ApiProperty({
    description: 'The uniq comment ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum',
  })
  public message!: string;

  @Expose()
  @ApiProperty({
    description: 'The uniq post ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public postId!: string;

  @Expose()
  @ApiProperty({
    description: 'Create comment date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public createdAt!: Date;
}
