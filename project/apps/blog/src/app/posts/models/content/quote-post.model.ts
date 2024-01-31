import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuotePostContent } from '@project/libs/shared/app/types';
import { BasePostContentModel } from './base-post-content.model';

@Schema({
  collection: 'quote-posts-content',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class QuotePostContentModel
  extends BasePostContentModel
  implements QuotePostContent
{
  constructor() {
    super();
  }

  @Prop({
    required: true,
  })
  public quote!: string;

  @Prop({
    required: true,
  })
  public author!: string;
}

export const QuotePostContentSchema = SchemaFactory.createForClass(
  QuotePostContentModel
);
