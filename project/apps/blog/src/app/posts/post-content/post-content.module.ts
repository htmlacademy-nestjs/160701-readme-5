import { Module } from '@nestjs/common';
import { PostContentController } from './post-content.controller';
import { PostContentService } from './post-content.service';
import { AllContentRepository } from '../repository/content';
import { PostContentEntityFactory } from './post-content-entity.factory';
import { PostContentRepositoryFactory } from './post-content-repository.factory';

@Module({
  controllers: [PostContentController],
  providers: [
    PostContentService,
    PostContentEntityFactory,
    PostContentRepositoryFactory,
    ...AllContentRepository,
  ],
  exports: [PostContentService],
})
export class PostsContentModule {}
