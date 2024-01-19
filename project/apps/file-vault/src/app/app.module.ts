import { Module } from '@nestjs/common';
import {
  FileVaultConfigModule,
  getMongooseOptions,
} from '@project/config/file-vault';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileVaultConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
