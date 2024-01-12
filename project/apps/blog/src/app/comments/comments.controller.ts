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
import { fillDto, generateSchemeApiError } from '@project/shared/helpers';
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
    const newComment = await this.commentsService.create(createCommentDto);

    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    isArray: true,
    type: CommentRdo,
    status: HttpStatus.OK,
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
    status: HttpStatus.OK,
    description: 'Find comment by Id',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment not found',
    schema: generateSchemeApiError('Comment not found', HttpStatus.NOT_FOUND),
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const existComment = await this.commentsService.findOne(id);

    return fillDto(CommentRdo, existComment.toPOJO());
  }

  @ApiResponse({
    isArray: true,
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Find comments for Post',
  })
  @Get('/post/:id')
  public async findByPostId(@Param('id') id: string) {
    const existComments = await this.commentsService.findByPostId(id);

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
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const updatedComment = await this.commentsService.update(
      id,
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
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
