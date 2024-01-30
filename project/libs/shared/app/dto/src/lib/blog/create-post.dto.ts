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
    example: '65b809b8d6443b043b33eedb',
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
    example: ['hash'],
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
