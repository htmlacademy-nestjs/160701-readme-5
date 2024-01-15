import { Module } from '@nestjs/common';
import { PostContentService } from './post-content.service';
import { AllContentRepository } from '../repository/content';
import { PostContentEntityFactory } from './post-content-entity.factory';
import { PostContentRepositoryFactory } from './post-content-repository.factory';

@Module({
  providers: [
    PostContentService,
    PostContentEntityFactory,
    PostContentRepositoryFactory,
    ...AllContentRepository,
  ],
  exports: [PostContentService],
})
export class PostsContentModule {}
