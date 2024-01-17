import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { TextPostContentEntity } from '../../entities/content/text-post.entity';

@Injectable()
export class TextPostRepository extends BaseMemoryRepository<TextPostContentEntity> {}
