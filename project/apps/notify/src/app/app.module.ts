import { Module } from '@nestjs/common';
import { NotifyConfigModule } from '@project/config/notify';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/helpers';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    NotifyConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
