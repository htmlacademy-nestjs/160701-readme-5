import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';

export class PhotoPostContent extends BasePostContent {
  @Expose()
  path!: string;
}
