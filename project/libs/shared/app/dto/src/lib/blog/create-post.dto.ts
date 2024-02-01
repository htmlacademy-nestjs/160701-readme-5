import { ApiProperty } from '@nestjs/swagger';
import {
  PostContent,
  PostType,
  RefPostContentArray,
} from '@project/libs/shared/app/types';
import { Post } from '@project/validation';

import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Author id',
    example: '65b809b8d6443b043b33eedb',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
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
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(Post.tags.MaxSize)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MinLength(Post.tags.MinLength, { each: true })
  @MaxLength(Post.tags.MaxLength, { each: true })
  @Matches(Post.tags.Matches, {
    each: true,
    message:
      'tag must start with a letter and can only contain letters, numbers, underscores and pound.',
  })
  public tags!: string[];

  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefPostContentArray,
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ValidateNested()
  public content!: PostContent;
}
