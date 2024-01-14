import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';

export class TextPostContent extends BasePostContent {
  @Expose()
  title!: string;

  @Expose()
  annotation!: string;

  @Expose()
  content!: string;
}
