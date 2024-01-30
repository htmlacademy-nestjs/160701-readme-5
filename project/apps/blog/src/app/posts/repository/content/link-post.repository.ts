import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/shared/core';
import { LinkPostContentEntity } from '../../entities/content/link-post.entity';
import { LinkPostContentModel } from '../../models/content/link-post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LinkPostRepository extends BaseMongoRepository<
  LinkPostContentEntity,
  LinkPostContentModel
> {
  constructor(
    @InjectModel(LinkPostContentModel.name)
    linkContentModel: Model<LinkPostContentModel>
  ) {
    super(linkContentModel, LinkPostContentEntity.fromObject);
  }
}
