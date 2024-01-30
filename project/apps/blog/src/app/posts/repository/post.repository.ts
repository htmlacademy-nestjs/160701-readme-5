import { BaseMongoRepository } from '@project/shared/core';
import { PostEntity } from '../entities/post.entity';
import { PostModel } from '../models/posts.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class PostRepository extends BaseMongoRepository<PostEntity, PostModel> {
  constructor(@InjectModel(PostModel.name) postModel: Model<PostModel>) {
    super(postModel, PostEntity.fromObject);
  }
}
