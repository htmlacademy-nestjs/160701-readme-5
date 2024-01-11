import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/libs/shared/app/types';

export class CreateCommentDto implements Omit<Comment, 'createdAt'> {
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum',
  })
  public message!: string;

  @ApiProperty({
    description: 'Comment post id',
    example: '1c3e0eae-fad2-4beb-9bd8-8baac7aabfff',
  })
  public postId!: string;
}
