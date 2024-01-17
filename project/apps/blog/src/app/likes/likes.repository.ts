import { BaseMemoryRepository } from '@project/shared/core';
import { LikeEntity } from './entities/like.entity';

export class LikesRepository extends BaseMemoryRepository<LikeEntity> {
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
