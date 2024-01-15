import { CreatePhotoPostDto } from './create-photo-post.dto';
import { CreateQuotePostDto } from './create-quote-post.dto';
import { CreateVideoPostDto } from './create-video-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreateLinkPostDto } from './create-link-post.dto';

export {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
};

export type AllCreateDto =
  | CreateVideoPostDto
  | CreatePhotoPostDto
  | CreateQuotePostDto
  | CreateTextPostDto
  | CreateLinkPostDto;
