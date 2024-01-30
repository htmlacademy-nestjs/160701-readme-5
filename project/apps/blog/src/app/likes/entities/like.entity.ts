import { Entity } from '@project/shared/core';
import { Like } from '@project/libs/shared/app/types';

export class LikeEntity implements Like, Entity<string> {
  public id?: string;
  public createdAt?: Date;
  public userId!: string;
  public postId!: string;

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      postId: this.postId,
    };
  }

  public populate(data: Like): LikeEntity {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt;
    this.userId = data.userId;
    this.postId = data.postId;

    return this;
  }

  static fromObject(data: Like): LikeEntity {
    return new LikeEntity().populate(data);
  }
}
