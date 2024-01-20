import { Module } from '@nestjs/common';
import { NotifyConfigModule } from '@project/config/notify';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/helpers';

@Module({
  imports: [
    NotifyConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
