import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PostContentValidator } from '@project/validation';

export class VideoPostContent extends BasePostContent {
  @ApiProperty({
    description: 'Video title',
    example: 'Lorem ipsum',
  })
  @Expose()
  @IsString()
  @MinLength(PostContentValidator.video.title.Min)
  @MaxLength(PostContentValidator.video.title.Max)
  title!: string;

  @ApiProperty({
    description: 'Valid url link',
    example: 'https://youtu.be/s9v9wv9sv',
  })
  @Expose()
  @Matches(PostContentValidator.video.url.Matches)
  url!: string;
}
