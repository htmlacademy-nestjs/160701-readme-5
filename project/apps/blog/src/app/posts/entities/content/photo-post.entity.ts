import { PhotoPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class PhotoPostContentEntity
  extends BasePostContentEntity
  implements PhotoPostContent
{
  public path!: string;

  constructor(post: PhotoPostContent) {
    super(post);
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      url: this.path,
    };
  }

  public populate(data: PhotoPostContent): void {
    super.populate(data);
    this.path = data.path;
  }
}
