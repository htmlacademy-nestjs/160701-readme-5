import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Subscriber } from '@project/libs/shared/app/types';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public firstname!: string;

  @Prop({
    required: true,
  })
  public userId!: string;

  public id?: string;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);
