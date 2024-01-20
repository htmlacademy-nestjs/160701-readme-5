import { Module } from '@nestjs/common';
import { NotifyConfigModule, getMongooseOptions } from '@project/config/notify';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NotifyConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
