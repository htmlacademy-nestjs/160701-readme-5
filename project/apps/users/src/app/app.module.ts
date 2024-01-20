import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/users';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/helpers';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions('db')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
