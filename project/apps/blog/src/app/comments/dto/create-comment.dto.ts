import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@project/libs/shared/app/types';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { CommentValidator } from '@project/validation';

export class CreateCommentDto implements Omit<Comment, 'createdAt'> {
  @ApiProperty({
    description: 'Comment message',
    example: 'Lorem ipsum',
  })
  @IsString()
  @MinLength(CommentValidator.message.Min)
  @MaxLength(CommentValidator.message.Max)
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
