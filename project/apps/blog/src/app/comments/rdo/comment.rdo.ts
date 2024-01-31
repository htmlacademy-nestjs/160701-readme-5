import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class CommentRdo implements Comment {
  @Expose()
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '65b809b8d6443b043b33eedb',
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
    example: '65b80a0f61f1dff77ea2da3b',
  })
  public postId!: string;

  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: '65b80a917f56bfcfe7cb8729',
  })
  public userId!: string;

  @Expose()
  @ApiProperty({
    description: 'Create comment date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public createdAt!: Date;
}
