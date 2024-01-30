import { PhotoPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class PhotoPostContentEntity
  extends BasePostContentEntity
  implements PhotoPostContent
{
  public path!: string;

  constructor() {
    super();
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      url: this.path,
    };
  }

  public populate(data: PhotoPostContent): PhotoPostContentEntity {
    super.populate(data);
    this.path = data.path;

    return this;
  }

  static fromObject(data: PhotoPostContent): PhotoPostContentEntity {
    return new PhotoPostContentEntity().populate(data);
  }
}
