import { Module } from '@nestjs/common';
import { FileVaultConfigModule } from '@project/config/file-vault';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

@Module({
  imports: [FileVaultConfigModule, FileUploaderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
