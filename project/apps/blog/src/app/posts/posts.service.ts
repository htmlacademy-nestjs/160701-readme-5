import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { PostContentService } from './post-content/post-content.service';
import { Post, PostStatus, PostType } from '@project/libs/shared/app/types';
import { PostEntity } from './entities/post.entity';

import { CreatePostDto } from './dto/create/create-post.dto';
import { UpdatePostDto } from './dto/update/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly basePostContentService: PostContentService
  ) {}
  public async create(dto: CreatePostDto) {
    const contentId = (
      await this.basePostContentService.save(dto.type, dto.content)
    )?.id;

    if (!contentId) {
      throw new ConflictException('Post content can not created');
    }

    const post: Post = {
      type: dto.type,
      contentId,
      createdAt: new Date(),
      postedAt: new Date(),
      status: PostStatus.Public,
      author: dto.author,
      repost: false,
      tags: dto.tags,
    };
    const contentEntity = await this.basePostContentService.findById(
      dto.type,
      contentId
    );
    const postEntity = new PostEntity(post);
    await this.postRepository.save(postEntity);

    const fullEntity = {
      ...postEntity.toPOJO(),
      content: contentEntity?.toPOJO(),
    };

    return fullEntity;
  }

  public async findAll() {
    const posts = await this.postRepository.findAll();

    return posts;
  }

  public async postTypesAll() {
    const types = Object.values(PostType);

    return types;
  }

  public async findOne(id: string) {
    const existEntity = await this.postRepository.findById(id);

    if (!existEntity) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return existEntity;
  }

  public async update(id: string, updatePostDto: UpdatePostDto) {
    const existEntity = await this.postRepository.findById(id);

    if (!existEntity) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const updatedEntity = await this.postRepository.update(id, existEntity);

    return updatedEntity;
  }

  public async remove(id: string) {
    return this.postRepository.deleteById(id);
  }
}
