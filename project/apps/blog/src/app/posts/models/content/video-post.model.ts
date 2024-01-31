import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VideoPostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';

@Schema({
  collection: 'video-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class VideoPostContentModel
  extends BasePostContentModel
  implements VideoPostContent
{
  constructor() {
    super();
  }

  @Prop({
    required: true,
  })
  public url!: string;

  @Prop({
    required: true,
  })
  public title!: string;
}

export const VideoPostContentSchema = SchemaFactory.createForClass(
  VideoPostContentModel
);
