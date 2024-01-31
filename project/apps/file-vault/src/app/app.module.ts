import { Module } from '@nestjs/common';
import { FileVaultConfigModule } from '@project/config/file-vault';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/helpers';

@Module({
  imports: [
    FileVaultConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions('db')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
