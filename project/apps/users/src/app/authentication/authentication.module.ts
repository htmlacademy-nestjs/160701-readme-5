import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [BlogUserModule, NotifyModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
