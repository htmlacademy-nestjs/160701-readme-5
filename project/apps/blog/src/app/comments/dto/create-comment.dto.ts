import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/libs/shared/app/types';

export class CreateCommentDto implements Omit<Comment, 'createdAt'> {
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum',
  })
  public message!: string;

  @ApiProperty({
    description: 'Post id',
    example: '52b7a93fe29bcc5e9410a607',
  })
  public postId!: string;

  @ApiProperty({
    description: 'User id',
    example: '65b7a93fe29bcc5e9410a607',
  })
  public userId!: string;
}
