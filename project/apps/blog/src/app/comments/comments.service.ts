import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comment.repository';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  public async create(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity().populate(dto);

    return this.commentsRepository.save(commentEntity);
  }

  public async findByPostId(id: string) {
    return this.commentsRepository.findByPostId(id);
  }

  public async findAll() {
    return this.commentsRepository.findAll();
  }

  public async findOne(id: string) {
    const existComment = await this.commentsRepository.findById(id);

    if (!existComment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return existComment;
  }

  public async update(id: string, updateCommentDto: UpdateCommentDto) {
    const existComment = await this.commentsRepository.findById(id);

    if (!existComment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    const newCommentEntity = new CommentEntity().populate({
      ...existComment.toPOJO(),
      message: updateCommentDto.message,
    });
    const newComment = await this.commentsRepository.update(
      id,
      newCommentEntity
    );

    return newComment;
  }

  public async remove(id: string) {
    return this.commentsRepository.deleteById(id);
  }
}
