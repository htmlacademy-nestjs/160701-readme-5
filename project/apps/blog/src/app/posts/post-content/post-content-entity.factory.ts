import {
  LinkPostContent,
  PhotoPostContent,
  PostContent,
  PostType,
  QuotePostContent,
  TextPostContent,
  VideoPostContent,
} from '@project/libs/shared/app/types';

import {
  UnionAllContentEntity,
  LinkPostContentEntity,
  PhotoPostContentEntity,
  QuotePostContentEntity,
  TextPostContentEntity,
  VideoPostContentEntity,
} from '../entities/content';
import { Injectable, NotImplementedException } from '@nestjs/common';

interface PostContentEntity {
  create(type: PostType, content: PostContent): UnionAllContentEntity;
}

@Injectable()
export class PostContentEntityFactory implements PostContentEntity {
  public create(type: PostType, content: PostContent) {
    switch (type) {
      case PostType.Video:
        return new VideoPostContentEntity(content as VideoPostContent); //TODO: remove as
      case PostType.Text:
        return new TextPostContentEntity(content as TextPostContent);
      case PostType.Link:
        return new LinkPostContentEntity(content as LinkPostContent);
      case PostType.Photo:
        return new PhotoPostContentEntity(content as PhotoPostContent);
      case PostType.Quote:
        return new QuotePostContentEntity(content as QuotePostContent);
      default:
        throw new NotImplementedException('Not implements post type');
    }
  }
}
