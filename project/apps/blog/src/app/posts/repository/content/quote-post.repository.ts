import { Injectable } from '@nestjs/common';
import { QuotePostContentEntity } from '../../entities/content/quote-post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { QuotePostContentModel } from '../../models/content/quote-post.model';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@project/shared/core';

@Injectable()
export class QuotePostRepository extends BaseMongoRepository<
  QuotePostContentEntity,
  QuotePostContentModel
> {
  constructor(
    @InjectModel(QuotePostContentModel.name)
    quoteContentModel: Model<QuotePostContentModel>
  ) {
    super(quoteContentModel, QuotePostContentEntity.fromObject);
  }
}
