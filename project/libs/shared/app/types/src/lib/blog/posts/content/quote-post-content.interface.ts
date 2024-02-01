import { ApiProperty } from '@nestjs/swagger';
import { BasePostContent } from './post-content.interface';
import { Expose } from 'class-transformer';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { PostContentValidator } from '@project/validation';
export class QuotePostContent extends BasePostContent {
  @Expose()
  @ApiProperty({
    description: 'Quote text',
    example: 'Be yourself; everyone else is already taken.',
  })
  @IsString()
  @MinLength(PostContentValidator.quote.quote.Min)
  @MaxLength(PostContentValidator.quote.quote.Max)
  quote!: string;

  @Expose()
  @ApiProperty({
    description: 'Text title',
    example: 'Oscar Wilde',
  })
  @IsString()
  @MinLength(PostContentValidator.quote.author.Min)
  @MaxLength(PostContentValidator.quote.author.Max)
  author!: string;
}
