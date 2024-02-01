import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { PostContentService } from './post-content/post-content.service';
import { PostStatus, PostType } from '@project/libs/shared/app/types';
import { PostEntity } from './entities/post.entity';

import { CreatePostDto } from '@project/dto';
import { UpdatePostDto } from './dto/update/update-post.dto';
import { getCurrentContentModel } from './models/content';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly basePostContentService: PostContentService
  ) {}
  public async create(dto: CreatePostDto) {
    const contentId = String(
      (await this.basePostContentService.save(dto.type, dto.content))?.id
    );

    const postEntity = PostEntity.fromObject({
      type: dto.type,
      contentId,
      contentType: getCurrentContentModel(dto.type),
      status: PostStatus.Public,
      author: dto.author,
      repost: false,
      tags: dto.tags,
    });

    return this.postRepository.save(postEntity);
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
