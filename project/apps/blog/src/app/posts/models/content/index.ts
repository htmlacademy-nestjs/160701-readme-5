import { PostType } from '@project/libs/shared/app/types';
import { VideoPostContentModel } from './video-post.model';
import { QuotePostContentModel } from './quote-post.model';
import { LinkPostContentModel } from './link-post.model';
import { TextPostContentModel } from './text-post.model';
import { PhotoPostContentModel } from './photo-post.model';

export const ContentModels = {
  [PostType.Video]: VideoPostContentModel.name,
  [PostType.Quote]: QuotePostContentModel.name,
  [PostType.Link]: LinkPostContentModel.name,
  [PostType.Text]: TextPostContentModel.name,
  [PostType.Photo]: PhotoPostContentModel.name,
} as const;

export const getCurrentContentModel = (type: PostType) => ContentModels[type];
