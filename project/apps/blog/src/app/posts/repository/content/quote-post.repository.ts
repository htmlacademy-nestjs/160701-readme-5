import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { QuotePostContentEntity } from '../../entities/content/quote-post.entity';

@Injectable()
export class QuotePostRepository extends BaseMemoryRepository<QuotePostContentEntity> {}
