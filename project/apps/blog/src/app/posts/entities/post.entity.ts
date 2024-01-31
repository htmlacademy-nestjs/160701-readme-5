import {
  Post,
  PostContent,
  PostStatus,
  PostType,
} from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';

export class PostEntity implements Post, Entity<string> {
  public id?: string;
  public type!: PostType;
  public createdAt?: Date;
  public postedAt?: Date;
  public contentId!: string;
  public content?: PostContent;
  public contentType?: string;
  public status!: PostStatus;
  public author!: string;
  public repost!: boolean;
  public repostId?: string;
  public tags?: string[];

  public toPOJO() {
    return {
      id: this.id,
      type: this.type,
      author: this.author,
      contentId: this.contentId,
      content: this.content,
      contentType: this.contentType,
      createdAt: this.createdAt,
      postedAt: this.postedAt,
      repost: this.repost,
      repostId: this.repostId,
      status: this.status,
      tags: this.tags,
    };
  }

  public populate(data: Post): PostEntity {
    this.id = data.id;
    this.type = data.type;
    this.author = data.author;
    this.contentId = data.contentId;
    this.content = data.content;
    this.contentType = data.contentType;
    this.createdAt = data.createdAt;
    this.postedAt = data.postedAt;
    this.repost = data.repost;
    this.repostId = data.repostId;
    this.status = data.status;
    this.tags = data.tags;

    return this;
  }

  static fromObject(data: Post): PostEntity {
    return new PostEntity().populate(data);
  }
}
