import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from './repository/post.repository';
import { PostsContentModule } from './post-content/post-content.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from './models/posts.model';

@Module({
  imports: [
    PostsContentModule,
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostRepository],
})
export class PostsModule {}
