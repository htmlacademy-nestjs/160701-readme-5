import { Expose } from 'class-transformer';

export class BasePostContent {
  @Expose()
  id?: string;
}
