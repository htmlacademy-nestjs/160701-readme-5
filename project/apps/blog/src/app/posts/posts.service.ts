import { ConflictException, Injectable } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { PostContentService } from './post-content/post-content.service';
import { Post, PostStatus, PostType } from '@project/libs/shared/app/types';
import { PostEntity } from './entities/post.entity';
import { AllCreateDto } from './dto/create/content';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly basePostContentService: PostContentService
  ) {}
  public async create(postType: PostType, dto: AllCreateDto) {
    const contentId = (
      await this.basePostContentService.save(postType, dto.content)
    )?.id;

    if (!contentId) {
      throw new ConflictException('Post content can not created');
    }

    const post: Post = {
      type: postType,
      contentId,
      createdAt: new Date(),
      postedAt: new Date(),
      status: PostStatus.Public,
      author: dto.author,
      repost: false,
      tags: dto.tags,
    };

    const postEntity = new PostEntity(post);
    await this.postRepository.save(postEntity);
    const fullEntity = {
      ...postEntity.toPOJO(),
      content: dto.content,
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
    const post = await this.postRepository.findById(id);

    return post;
  }

  // public async update(id: string, updatePostDto: UpdatePostDto) {
  //   const updatedPost = await this.postRepository.update(id, updatePostDto);

  //   return updatedPost;
  // }

  public async remove(id: string) {
    return this.postRepository.deleteById(id);
  }
}
