import { VideoPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class VideoPostContentEntity
  extends BasePostContentEntity
  implements VideoPostContent
{
  public title!: string;
  public url!: string;

  constructor() {
    super();
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      title: this.title,
      url: this.url,
    };
  }

  public populate(data: VideoPostContent): VideoPostContentEntity {
    super.populate(data);
    this.title = data.title;
    this.url = data.url;

    return this;
  }

  static fromObject(data: VideoPostContent): VideoPostContentEntity {
    return new VideoPostContentEntity().populate(data);
  }
}
