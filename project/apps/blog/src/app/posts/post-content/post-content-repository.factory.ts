import { PostType } from '@project/libs/shared/app/types';

import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  LinkPostRepository,
  PhotoPostRepository,
  QuotePostRepository,
  TextPostRepository,
  VideoPostRepository,
} from '../repository/content';
import { Repository } from '@project/shared/core';
import { BasePostContentEntity } from '../entities/content';
import { InjectModel } from '@nestjs/mongoose';
import { LinkPostContentModel } from '../models/content/link-post.model';
import { Model } from 'mongoose';
import { VideoPostContentModel } from '../models/content/video-post.model';
import { TextPostContentModel } from '../models/content/text-post.model';
import { PhotoPostContentModel } from '../models/content/photo-post.model';
import { QuotePostContentModel } from '../models/content/quote-post.model';

interface PostContentRepository {
  create(type: PostType): Repository<BasePostContentEntity>;
}

@Injectable()
export class PostContentRepositoryFactory implements PostContentRepository {
  private linkContentModel!: Model<LinkPostContentModel>;
  private videoContentModel!: Model<VideoPostContentModel>;
  private textContentModel!: Model<TextPostContentModel>;
  private photoContentModel!: Model<PhotoPostContentModel>;
  private quoteContentModel!: Model<QuotePostContentModel>;

  constructor(
    @InjectModel(LinkPostContentModel.name)
    linkContentModel: Model<LinkPostContentModel>,

    @InjectModel(VideoPostContentModel.name)
    videoContentModel: Model<VideoPostContentModel>,

    @InjectModel(TextPostContentModel.name)
    textContentModel: Model<TextPostContentModel>,

    @InjectModel(PhotoPostContentModel.name)
    photoContentModel: Model<PhotoPostContentModel>,

    @InjectModel(QuotePostContentModel.name)
    quoteContentModel: Model<QuotePostContentModel>
  ) {
    this.linkContentModel = linkContentModel;
    this.videoContentModel = videoContentModel;
    this.textContentModel = textContentModel;
    this.photoContentModel = photoContentModel;
    this.quoteContentModel = quoteContentModel;
  }

  public create(type: PostType) {
    switch (type) {
      case PostType.Video:
        return new VideoPostRepository(this.videoContentModel);
      case PostType.Text:
        return new TextPostRepository(this.textContentModel);
      case PostType.Link:
        return new LinkPostRepository(this.linkContentModel);
      case PostType.Photo:
        return new PhotoPostRepository(this.photoContentModel);
      case PostType.Quote:
        return new QuotePostRepository(this.quoteContentModel);
      default:
        throw new NotImplementedException(
          'Not implements post repository type'
        );
    }
  }
}
