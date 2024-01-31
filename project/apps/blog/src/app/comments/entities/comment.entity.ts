import { Entity } from '@project/shared/core';
import { Comment } from '@project/libs/shared/app/types';

export class CommentEntity implements Comment, Entity<string> {
  public id?: string;
  public createdAt?: Date;
  public message!: string;
  public postId!: string;
  public userId!: string;

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      message: this.message,
      postId: this.postId,
      userId: this.userId,
    };
  }

  public populate(data: Comment): CommentEntity {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt;
    this.message = data.message;
    this.postId = data.postId;
    this.userId = data.userId;

    return this;
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity().populate(data);
  }
}
