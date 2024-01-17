import { Entity } from '@project/shared/core';
import { Comment } from '@project/libs/shared/app/types';

export class CommentEntity implements Comment, Entity<string> {
  public id?: string;
  public createdAt!: Date;
  public message!: string;
  public postId!: string;

  constructor(comment: Comment) {
    this.populate(comment);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      message: this.message,
      postId: this.postId,
    };
  }

  public populate(data: Comment): void {
    this.createdAt = data.createdAt;
    this.message = data.message;
    this.postId = data.postId;
  }
}
