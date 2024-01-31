import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post, PostStatus, PostType } from '@project/libs/shared/app/types';
import { ContentModels } from './content';

@Schema({
  collection: 'posts',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'postedAt',
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  discriminatorKey: 'contentType',
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
    type: () => MongooseSchema.Types.ObjectId,
    refPath: 'contentType',
  })
  public contentId!: string;

  @Prop({
    required: true,
    enum: ContentModels,
  })
  public contentType!: string;

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

PostSchema.virtual('content').get(function () {
  return this.contentId;
});
