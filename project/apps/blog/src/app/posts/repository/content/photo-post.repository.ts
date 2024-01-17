import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { PhotoPostContentEntity } from '../../entities/content/photo-post.entity';

@Injectable()
export class PhotoPostRepository extends BaseMemoryRepository<PhotoPostContentEntity> {}
