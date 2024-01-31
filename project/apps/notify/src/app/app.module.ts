import { Module } from '@nestjs/common';
import { NotifyConfigModule } from '@project/config/notify';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/helpers';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    CronModule,
    NotifyConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions('db')),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
