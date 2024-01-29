import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser, UserRole } from '@project/libs/shared/app/types';

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop({
    default: null,
  })
  public avatar!: string;

  @Prop({
    required: true,
  })
  public createdAt!: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public firstname!: string;

  @Prop({
    required: true,
  })
  public passwordHash!: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role!: UserRole;

  @Prop({
    type: Number,
    default: 0,
  })
  subscribersCount!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  publicationsCount!: number;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);

BlogUserSchema.virtual('id').get(function () {
  return this._id.toString();
});
