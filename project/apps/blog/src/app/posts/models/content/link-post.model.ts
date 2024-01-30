import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LinkPostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';

@Schema({
  collection: 'link-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class LinkPostContentModel
  extends BasePostContentModel
  implements LinkPostContent
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
  public description!: string;
}

export const LinkPostContentSchema =
  SchemaFactory.createForClass(LinkPostContentModel);
