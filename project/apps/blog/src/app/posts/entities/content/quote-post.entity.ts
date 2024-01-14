import { QuotePostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class QuotePostContentEntity
  extends BasePostContentEntity
  implements QuotePostContent
{
  public author!: string;
  public quote!: string;

  constructor(post: QuotePostContent) {
    super(post);
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      url: this.author,
      quote: this.quote,
    };
  }

  public populate(data: QuotePostContent): void {
    super.populate(data);
    this.author = data.author;
    this.quote = data.quote;
  }
}
