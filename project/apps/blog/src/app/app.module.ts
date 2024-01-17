import { Module } from '@nestjs/common';

import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [CommentsModule, LikesModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
