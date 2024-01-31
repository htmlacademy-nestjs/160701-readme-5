import { LinkPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class LinkPostContentEntity
  extends BasePostContentEntity
  implements LinkPostContent
{
  public url!: string;
  public description!: string;

  constructor() {
    super();
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      url: this.url,
      description: this.description,
    };
  }

  public populate(data: LinkPostContent): LinkPostContentEntity {
    super.populate(data);
    this.url = data.url;
    this.description = data.description;

    return this;
  }

  static fromObject(data: LinkPostContent): LinkPostContentEntity {
    return new LinkPostContentEntity().populate(data);
  }
}
