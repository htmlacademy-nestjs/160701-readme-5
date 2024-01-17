import { BaseMemoryRepository } from '@project/shared/core';
import { PostEntity } from '../entities/post.entity';

export class PostRepository extends BaseMemoryRepository<PostEntity> {}
