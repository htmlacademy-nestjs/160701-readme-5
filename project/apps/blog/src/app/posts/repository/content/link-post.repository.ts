import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { LinkPostContentEntity } from '../../entities/content/link-post.entity';

@Injectable()
export class LinkPostRepository extends BaseMemoryRepository<LinkPostContentEntity> {}
