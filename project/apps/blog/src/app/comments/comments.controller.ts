import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { generateSchemeApiError } from '@project/shared/helpers';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment create successfully',
  })
  @Post()
  public async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Get all comments',
  })
  @Get()
  public async findAll() {
    return this.commentsService.findAll();
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Find comment by Id',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const existComment = await this.commentsService.findOne(id);

    return existComment;
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Find comments for Post',
  })
  @Get('/post/:id')
  public async findByPostId(@Param('id') id: string) {
    const existComments = await this.commentsService.findByPostId(id);

    return existComments;
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.PARTIAL_CONTENT,
    description: 'Comment update successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
    schema: generateSchemeApiError('Comment not found', HttpStatus.NOT_FOUND),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Remove comment',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
