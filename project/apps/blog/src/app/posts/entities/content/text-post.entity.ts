import { TextPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class TextPostContentEntity
  extends BasePostContentEntity
  implements TextPostContent
{
  public annotation!: string;
  public title!: string;
  public content!: string;

  constructor() {
    super();
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      annotation: this.annotation,
      title: this.title,
      content: this.content,
    };
  }

  public populate(data: TextPostContent): TextPostContentEntity {
    super.populate(data);
    this.annotation = data.annotation;
    this.title = data.title;
    this.content = data.content;

    return this;
  }

  static fromObject(data: TextPostContent): TextPostContentEntity {
    return new TextPostContentEntity().populate(data);
  }
}
