import { BaseMongoRepository } from '@project/shared/core';
import { CommentEntity } from './entities/comment.entity';
import { Injectable } from '@nestjs/common';
import { CommentModel } from './comments.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsRepository extends BaseMongoRepository<
  CommentEntity,
  CommentModel
> {
  constructor(
    @InjectModel(CommentModel.name) commentModel: Model<CommentModel>
  ) {
    super(commentModel, CommentEntity.fromObject);
  }

  public async findByPostId(postId: string) {
    const entities = await this.findAll();
    const comments = entities.filter((entity) => entity.postId === postId);

    return Promise.resolve(comments);
  }
}
