import { Module } from '@nestjs/common';
import { FileVaultConfigModule } from '@project/config/file-vault';

@Module({
  imports: [FileVaultConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
