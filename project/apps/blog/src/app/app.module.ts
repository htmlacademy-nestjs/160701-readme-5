import { Module } from '@nestjs/common';
import { BlogConfigModule } from '@project/config/blog';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/helpers';

@Module({
  imports: [
    CommentsModule,
    LikesModule,
    PostsModule,
    ...[
      BlogConfigModule,
      MongooseModule.forRootAsync(getMongooseOptions('db')),
    ],
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
