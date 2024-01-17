import { VideoPostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class VideoPostContentEntity
  extends BasePostContentEntity
  implements VideoPostContent
{
  public title!: string;
  public url!: string;

  constructor(post: VideoPostContent) {
    super(post);
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      title: this.title,
      url: this.url,
    };
  }

  public populate(data: VideoPostContent): void {
    super.populate(data);
    this.title = data.title;
    this.url = data.url;
  }
}
