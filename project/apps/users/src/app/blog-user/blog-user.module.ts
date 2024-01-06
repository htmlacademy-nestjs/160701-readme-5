import { Module } from '@nestjs/common';

@Module({
  providers: [BlogUserModule],
  exports: [BlogUserModule],
})
export class BlogUserModule {}
