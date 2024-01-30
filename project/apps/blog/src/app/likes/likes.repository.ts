import { BaseMongoRepository } from '@project/shared/core';
import { LikeEntity } from './entities/like.entity';
import { LikeModel } from './like.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class LikesRepository extends BaseMongoRepository<
  LikeEntity,
  LikeModel
> {
  constructor(@InjectModel(LikeModel.name) likeModel: Model<LikeModel>) {
    super(likeModel, LikeEntity.fromObject);
  }

  public async getAllByPostId(postId: string) {
    const entities = await this.findAll();
    const likes = entities.filter((entity) => entity.postId === postId);

    return Promise.resolve(likes);
  }

  public async findByPostAndUserId({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    const entities = await this.findAll();
    const like = entities.find(
      (entity) => entity.postId === postId && entity.userId === userId
    );

    return like;
  }
}
