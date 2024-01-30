import { Module } from '@nestjs/common';
import { PostContentService } from './post-content.service';
import { AllContentRepository } from '../repository/content';
import { PostContentEntityFactory } from './post-content-entity.factory';
import { PostContentRepositoryFactory } from './post-content-repository.factory';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LinkPostContentModel,
  LinkPostContentSchema,
} from '../models/content/link-post.model';
import {
  VideoPostContentModel,
  VideoPostContentSchema,
} from '../models/content/video-post.model';
import {
  TextPostContentModel,
  TextPostContentSchema,
} from '../models/content/text-post.model';
import {
  QuotePostContentModel,
  QuotePostContentSchema,
} from '../models/content/quote-post.model';
import {
  PhotoPostContentModel,
  PhotoPostContentSchema,
} from '../models/content/photo-post.model';

@Module({
  imports: [
    PostsContentModule,
    MongooseModule.forFeature([
      { name: LinkPostContentModel.name, schema: LinkPostContentSchema },
      { name: VideoPostContentModel.name, schema: VideoPostContentSchema },
      { name: TextPostContentModel.name, schema: TextPostContentSchema },
      { name: QuotePostContentModel.name, schema: QuotePostContentSchema },
      { name: PhotoPostContentModel.name, schema: PhotoPostContentSchema },
    ]),
  ],
  providers: [
    PostContentService,
    PostContentEntityFactory,
    PostContentRepositoryFactory,
    ...AllContentRepository,
  ],
  exports: [PostContentService],
})
export class PostsContentModule {}
