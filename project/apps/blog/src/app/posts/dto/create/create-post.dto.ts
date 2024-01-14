import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Author id',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public author!: string;

  @ApiProperty({
    description: 'Post hash tags',
    example: ['#hash'],
  })
  public tags!: string[];
}
