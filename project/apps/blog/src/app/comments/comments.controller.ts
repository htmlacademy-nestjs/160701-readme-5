import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto, generateSchemeApiError } from '@project/shared/helpers';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    isArray: true,
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Get all comments',
  })
  @ApiOperation({
    summary: 'Получить все комментарии',
    description: 'Get all comments',
  })
  @Get()
  public async findAll() {
    const comments = await this.commentsService.findAll();

    return fillDto(
      CommentRdo,
      comments.map((el) => el.toPOJO())
    );
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment create successfully',
  })
  @ApiOperation({
    summary: 'Создать комментарий',
    description: 'Create comment',
  })
  @Post()
  public async create(@Body() createCommentDto: CreateCommentDto) {
    const newComment = await this.commentsService.create(createCommentDto);

    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Find comment by Id',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
    schema: generateSchemeApiError('Comment not found', HttpStatus.NOT_FOUND),
  })
  @ApiOperation({
    summary: 'Получить комментарий по id',
    description: 'Find comment by Id',
  })
  @Get(':commentId')
  public async findOne(@Param('commentId') commentId: string) {
    const existComment = await this.commentsService.findOne(commentId);

    return fillDto(CommentRdo, existComment.toPOJO());
  }

  @ApiResponse({
    isArray: true,
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Find comments for Post',
  })
  @ApiOperation({
    summary: 'Получить все комментарии к посту по id',
    description: 'Find all comments by postId',
  })
  @Get('/post/:postId')
  public async findByPostId(@Param('postId') postId: string) {
    const existComments = await this.commentsService.findByPostId(postId);

    return fillDto(
      CommentRdo,
      existComments.map((el) => el.toPOJO())
    );
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
  @ApiOperation({
    summary: 'Изменить комментарий',
    description: 'Fix comment by commentId',
  })
  @Patch(':commentId')
  public async update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const updatedComment = await this.commentsService.update(
      commentId,
      updateCommentDto
    );

    return fillDto(CommentRdo, updatedComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Remove comment',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
    schema: generateSchemeApiError('Comment not found', HttpStatus.NOT_FOUND),
  })
  @ApiOperation({
    summary: 'Удалить комментарий',
    description: 'Remove comment',
  })
  @Delete(':commentId')
  public async remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId);
  }
}
