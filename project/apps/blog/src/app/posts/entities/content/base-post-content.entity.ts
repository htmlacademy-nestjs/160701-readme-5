import { BasePostContent } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';

export class BasePostContentEntity implements BasePostContent, Entity<string> {
  public id?: string;
  public createdAt?: string;

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
    };
  }

  public populate(data: BasePostContent): BasePostContentEntity {
    this.id = data.id;
    this.createdAt = data.createdAt;

    return this;
  }

  static fromObject(data: BasePostContent): BasePostContentEntity {
    return new BasePostContentEntity().populate(data);
  }
}
