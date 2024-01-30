import { PhotoPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class PhotoPostContentEntity
  extends BasePostContentEntity
  implements PhotoPostContent
{
  public imageId!: string;

  constructor() {
    super();
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      imageId: this.imageId,
    };
  }

  public populate(data: PhotoPostContent): PhotoPostContentEntity {
    super.populate(data);
    this.imageId = data.imageId;

    return this;
  }

  static fromObject(data: PhotoPostContent): PhotoPostContentEntity {
    return new PhotoPostContentEntity().populate(data);
  }
}
