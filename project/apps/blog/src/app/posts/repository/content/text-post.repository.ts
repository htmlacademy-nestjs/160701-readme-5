import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/shared/core';
import { TextPostContentEntity } from '../../entities/content/text-post.entity';
import { TextPostContentModel } from '../../models/content/text-post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TextPostRepository extends BaseMongoRepository<
  TextPostContentEntity,
  TextPostContentModel
> {
  constructor(
    @InjectModel(TextPostContentModel.name)
    textContentModel: Model<TextPostContentModel>
  ) {
    super(textContentModel, TextPostContentEntity.fromObject);
  }
}
