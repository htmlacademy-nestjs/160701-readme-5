import { Post, PostStatus, PostType } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';

export class PostEntity implements Post, Entity<string> {
  public id?: string;
  public type!: PostType;
  public createdAt?: Date;
  public postedAt?: Date;
  public contentId!: string;
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
      createdDate: this.createdAt,
      postedDate: this.postedAt,
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
