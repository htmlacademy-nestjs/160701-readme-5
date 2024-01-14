import { LinkPostContent } from './link-post-content.interface';
import { PhotoPostContent } from './photo-post-content.interface';
import { QuotePostContent } from './quote-post-content.interface';
import { TextPostContent } from './text-post-content.interface';
import { VideoPostContent } from './video-post-content.interface';

export type PostContent =
  | LinkPostContent
  | PhotoPostContent
  | QuotePostContent
  | TextPostContent
  | VideoPostContent;
