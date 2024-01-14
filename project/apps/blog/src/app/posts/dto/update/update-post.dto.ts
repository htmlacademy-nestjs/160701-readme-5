import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from '../create/create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Post hash tags',
    example: ['#hash'],
  })
  public tags!: string[];
}
