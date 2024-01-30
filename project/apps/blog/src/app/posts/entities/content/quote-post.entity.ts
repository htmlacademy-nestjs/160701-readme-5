import { QuotePostContent } from '@project/libs/shared/app/types';
import { BasePostContentEntity } from './base-post-content.entity';

export class QuotePostContentEntity
  extends BasePostContentEntity
  implements QuotePostContent
{
  public author!: string;
  public quote!: string;

  constructor() {
    super();
  }

  public toPOJO() {
    const basePOJO = super.toPOJO();

    return {
      ...basePOJO,
      author: this.author,
      quote: this.quote,
    };
  }

  public populate(data: QuotePostContent): QuotePostContentEntity {
    super.populate(data);
    this.author = data.author;
    this.quote = data.quote;

    return this;
  }

  static fromObject(data: QuotePostContent): QuotePostContentEntity {
    return new QuotePostContentEntity().populate(data);
  }
}
