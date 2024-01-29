import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Post, PostStatus, PostType } from '@project/libs/shared/app/types';

@Schema({
  collection: 'posts',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class PostModel extends Document implements Post {
  public id?: string;

  @Prop({
    required: true,
    type: () => String,
    enum: PostStatus,
    default: PostStatus.Public,
  })
  public status!: PostStatus;

  @Prop({
    required: true,
    type: () => String,
    enum: PostType,
  })
  public type!: PostType;

  @Prop({
    required: true,
  })
  public contentId!: string;

  @Prop({
    required: true,
  })
  public author!: string;

  @Prop({
    required: true,
  })
  public repost!: boolean;

  @Prop()
  public repostId?: string;

  @Prop({
    type: () => [String],
    set: (value: string[]) => Array.from(new Set([...value])),
  })
  public tags?: string[];
}

export const PostSchema = SchemaFactory.createForClass(PostModel);

PostSchema.virtual('id').get(function () {
  return this._id.toString();
});
