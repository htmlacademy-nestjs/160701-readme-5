import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [CommentsModule, LikesModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
