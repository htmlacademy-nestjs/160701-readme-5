import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PhotoPostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';

@Schema({
  collection: 'photo-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class PhotoPostContentModel
  extends BasePostContentModel
  implements PhotoPostContent
{
  constructor() {
    super();
  }

  @Prop({
    required: true,
  })
  public imageId!: string;
}

export const PhotoPostContentSchema = SchemaFactory.createForClass(
  PhotoPostContentModel
);
