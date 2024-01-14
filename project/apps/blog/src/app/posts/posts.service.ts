import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create/create-post.dto';
import { UpdatePostDto } from './dto/update/update-post.dto';
import { PostRepository } from './repository/post.repository';
import { PostContentService } from './post-content/post-content.service';
import { Post, PostStatus, PostType } from '@project/libs/shared/app/types';
import { PostEntity } from './entities/post.entity';
import { CreateVideoPostDto } from './dto/create/create-video-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly basePostContentService: PostContentService
  ) {}
  public async create(postType: PostType, dto: CreateVideoPostDto) {
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
      status: PostStatus.Draft,
      author: dto.author,
      repost: false,
      tags: dto.tags,
    };

    const postEntity = new PostEntity(post);

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
