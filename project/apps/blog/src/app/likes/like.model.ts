import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Like } from '@project/libs/shared/app/types';

@Schema({
  collection: 'likes',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class LikeModel extends Document implements Like {
  public id?: string;

  @Prop({
    required: true,
  })
  public postId!: string;

  @Prop({
    required: true,
  })
  public userId!: string;
}

export const LikeSchema = SchemaFactory.createForClass(LikeModel);
