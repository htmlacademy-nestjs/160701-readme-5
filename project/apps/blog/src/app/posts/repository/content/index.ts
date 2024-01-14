import { VideoPostRepository } from './video-post.repository';
import { LinkPostRepository } from './link-post.repository';
import { PhotoPostRepository } from './photo-post.repository';
import { QuotePostRepository } from './quote-post.repository';
import { TextPostRepository } from './text-post.repository';

export {
  VideoPostRepository,
  LinkPostRepository,
  PhotoPostRepository,
  QuotePostRepository,
  TextPostRepository,
};

export const AllContentRepository = [
  VideoPostRepository,
  LinkPostRepository,
  PhotoPostRepository,
  QuotePostRepository,
  TextPostRepository,
];

export type UnionAllContentRepository =
  | VideoPostRepository
  | LinkPostRepository
  | PhotoPostRepository
  | QuotePostRepository
  | TextPostRepository;
