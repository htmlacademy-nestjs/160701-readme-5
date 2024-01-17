import { BaseMemoryRepository } from '@project/shared/core';
import { CommentEntity } from './entities/comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository extends BaseMemoryRepository<CommentEntity> {
  public async findByPostId(postId: string) {
    const entities = await this.findAll();
    const comments = entities.filter((entity) => entity.postId === postId);

    return Promise.resolve(comments);
  }
}
