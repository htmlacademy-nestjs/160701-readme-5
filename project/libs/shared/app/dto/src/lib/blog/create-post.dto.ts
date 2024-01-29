import { ApiProperty } from '@nestjs/swagger';
import {
  PostContent,
  PostType,
  RefPostContentArray,
} from '@project/libs/shared/app/types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Author id',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  @IsNotEmpty()
  @IsString()
  public author!: string;

  @ApiProperty({
    enum: PostType,
    description: 'Post type',
    example: PostType.Video,
  })
  @IsEnum(PostType)
  public type!: PostType;

  @ApiProperty({
    description: 'Post hash tags',
    example: ['#hash'],
  })
  @IsString({ each: true })
  public tags!: string[];

  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefPostContentArray,
  })
  @IsNotEmpty()
  public content!: PostContent;
}
