import { BasePostContent } from './post-content.interface';
import { Expose } from 'class-transformer';

export class QuotePostContent extends BasePostContent {
  @Expose()
  quote!: string;

  @Expose()
  author!: string;
}
