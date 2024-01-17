import { BasePostContentEntity } from './base-post-content.entity';
import { VideoPostContentEntity } from './video-post.entity';
import { TextPostContentEntity } from './text-post.entity';
import { LinkPostContentEntity } from './link-post.entity';
import { PhotoPostContentEntity } from './photo-post.entity';
import { QuotePostContentEntity } from './quote-post.entity';

export {
  BasePostContentEntity,
  VideoPostContentEntity,
  TextPostContentEntity,
  LinkPostContentEntity,
  PhotoPostContentEntity,
  QuotePostContentEntity,
};

export type UnionAllContentEntity =
  | VideoPostContentEntity
  | TextPostContentEntity
  | LinkPostContentEntity
  | PhotoPostContentEntity
  | QuotePostContentEntity;
