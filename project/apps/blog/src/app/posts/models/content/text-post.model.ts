import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TextPostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';

@Schema({
  collection: 'text-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class TextPostContentModel
  extends BasePostContentModel
  implements TextPostContent
{
  constructor() {
    super();
  }

  @Prop({
    required: true,
  })
  public annotation!: string;

  @Prop({
    required: true,
  })
  public title!: string;

  @Prop({
    required: true,
  })
  public content!: string;
}

export const TextPostContentSchema =
  SchemaFactory.createForClass(TextPostContentModel);
