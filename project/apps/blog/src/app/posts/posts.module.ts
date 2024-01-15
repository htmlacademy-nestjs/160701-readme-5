import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from './repository/post.repository';
import { PostsContentModule } from './post-content/post-content.module';
import { PostsCreateController } from './posts-create.controller';

@Module({
  imports: [PostsContentModule],
  controllers: [PostsCreateController, PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostRepository],
})
export class PostsModule {}
