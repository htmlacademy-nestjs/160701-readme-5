import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '@project/libs/shared/app/types';

@Schema({
  collection: 'comments',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class CommentModel extends Document implements Comment {
  public id?: string;

  @Prop({
    required: true,
  })
  public postId!: string;

  @Prop({
    required: true,
  })
  public userId!: string;

  @Prop({
    required: true,
  })
  public message!: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
