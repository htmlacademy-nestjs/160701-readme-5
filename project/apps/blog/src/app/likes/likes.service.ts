import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  public async getLikesByPostId(postId: string) {
    const likes = await this.likesRepository.getAllByPostId(postId);

    return likes;
  }

  public async createLike({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    const like = await this.likesRepository.findByPostAndUserId({
      postId: postId,
      userId: userId,
    });

    if (like) {
      throw new ConflictException(
        `Like with current postId: ${postId} and userId:${userId} exists`
      );
    }

    const likeEntity = new LikeEntity().populate({
      userId,
      postId,
    });

    return this.likesRepository.save(likeEntity);
  }

  public async deleteLike({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    const like = await this.likesRepository.findByPostAndUserId({
      postId: postId,
      userId: userId,
    });

    if (!like) {
      throw new NotFoundException(
        `Like with current postId:${postId} and userId:${userId} not found`
      );
    }

    return this.likesRepository.deleteById(like.id);
  }

  public async getAll() {
    return this.likesRepository.findAll();
  }
}
