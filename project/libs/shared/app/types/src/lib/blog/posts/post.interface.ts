import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;
  createdAt: Date;
  postedAt: Date;
  status: PostStatus;
  type: PostType;
  contentId: string;
  author: string;
  repost: boolean;
  repostId?: string;
  tags?: string[];
}
