import { Injectable } from '@nestjs/common';
import { VideoPostContentEntity } from '../../entities/content';
import { BaseMongoRepository } from '@project/shared/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoPostContentModel } from '../../models/content/video-post.model';

@Injectable()
export class VideoPostRepository extends BaseMongoRepository<
  VideoPostContentEntity,
  VideoPostContentModel
> {
  constructor(
    @InjectModel(VideoPostContentModel.name)
    videoContentModel: Model<VideoPostContentModel>
  ) {
    super(videoContentModel, VideoPostContentEntity.fromObject);
  }
}
