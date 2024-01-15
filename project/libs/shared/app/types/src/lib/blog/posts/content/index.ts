import { PartialType, getSchemaPath } from '@nestjs/swagger';
import { LinkPostContent } from './link-post-content.interface';
import { PhotoPostContent } from './photo-post-content.interface';
import { QuotePostContent } from './quote-post-content.interface';
import { TextPostContent } from './text-post-content.interface';
import { VideoPostContent } from './video-post-content.interface';

export const AllPostContentArray = [
  LinkPostContent,
  PhotoPostContent,
  QuotePostContent,
  TextPostContent,
  VideoPostContent,
];

export type PostContent =
  | LinkPostContent
  | PhotoPostContent
  | QuotePostContent
  | TextPostContent
  | VideoPostContent;

export const RefPostContentArray = AllPostContentArray.map((PostTypeClass) => ({
  $ref: getSchemaPath(PostTypeClass),
}));

export const AllOptionPostContentArray = [
  class LinkPostContentOptional extends PartialType(LinkPostContent) {},
  class PhotoPostContentOptional extends PartialType(PhotoPostContent) {},
  class VideoPostContentOptional extends PartialType(VideoPostContent) {},
  class TextPostContentOptional extends PartialType(TextPostContent) {},
  class QuotePostContentOptional extends PartialType(QuotePostContent) {},
];

export const RefOptionalPostContentArray = AllOptionPostContentArray.map(
  (PostTypeClass) => ({
    $ref: getSchemaPath(PostTypeClass),
  })
);
