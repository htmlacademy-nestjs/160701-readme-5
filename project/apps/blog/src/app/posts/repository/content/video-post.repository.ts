import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { VideoPostContentEntity } from '../../entities/content';

@Injectable()
export class VideoPostRepository extends BaseMemoryRepository<VideoPostContentEntity> {}
