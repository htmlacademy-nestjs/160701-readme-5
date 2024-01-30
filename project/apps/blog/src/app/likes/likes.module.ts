import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeModel, LikeSchema } from './like.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LikeModel.name, schema: LikeSchema }]),
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
