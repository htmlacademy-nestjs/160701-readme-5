import { LinkPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class LinkPostContentEntity
  extends BasePostContentEntity
  implements LinkPostContent
{
  public url!: string;
  public description!: string;

  constructor(post: LinkPostContent) {
    super(post);
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      url: this.url,
      description: this.description,
    };
  }

  public populate(data: LinkPostContent): void {
    super.populate(data);
    this.url = data.url;
    this.description = data.description;
  }
}
