import { Document } from 'mongoose';
import { BasePostContent } from '@project/libs/shared/app/types';

export class BasePostContentModel extends Document implements BasePostContent {
  public id?: string;
  public createdAt?: string;
  public updatedAt?: string;
}
