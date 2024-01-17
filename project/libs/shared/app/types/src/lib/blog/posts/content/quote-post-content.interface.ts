import { ApiProperty } from '@nestjs/swagger';
import { BasePostContent } from './post-content.interface';
import { Expose } from 'class-transformer';

export class QuotePostContent extends BasePostContent {
  @Expose()
  @ApiProperty({
    description: 'Quote text',
    example: 'Be yourself; everyone else is already taken.',
  })
  quote!: string;

  @Expose()
  @ApiProperty({
    description: 'Text title',
    example: 'Oscar Wilde',
  })
  author!: string;
}
