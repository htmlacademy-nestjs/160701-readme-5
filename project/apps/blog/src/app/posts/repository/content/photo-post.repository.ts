import { Injectable } from '@nestjs/common';
import { PhotoPostContentEntity } from '../../entities/content/photo-post.entity';
import { PhotoPostContentModel } from '../../models/content/photo-post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoRepository } from '@project/shared/core';

@Injectable()
export class PhotoPostRepository extends BaseMongoRepository<
  PhotoPostContentEntity,
  PhotoPostContentModel
> {
  constructor(
    @InjectModel(PhotoPostContentModel.name)
    photoContentModel: Model<PhotoPostContentModel>
  ) {
    super(photoContentModel, PhotoPostContentEntity.fromObject);
  }
}
