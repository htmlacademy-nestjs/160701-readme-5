import { BasePostContent } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';

export class BasePostContentEntity implements BasePostContent, Entity<string> {
  public id?: string;

  constructor(post: BasePostContent) {
    this.populate(post);
  }

  public toPOJO() {
    return {
      id: this.id,
    };
  }

  public populate(data: BasePostContent): void {
    this.id = data.id;
  }
}
