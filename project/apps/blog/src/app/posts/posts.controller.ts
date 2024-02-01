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
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { PostTypesRdo } from './rdo/post-types.rdo';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from '@project/dto';
import { UpdatePostDto } from './dto/update/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост',
  })
  @Post()
  public async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);

    return fillDto(PostRdo, post);
  }

  @ApiOperation({
    summary: 'Получить все посты',
  })
  @ApiResponse({
    isArray: true,
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @Get()
  public async findAll() {
    const posts = await this.postsService.findAll();

    return fillDto(PostRdo, posts);
  }

  @ApiResponse({
    type: PostTypesRdo,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Получить типы всех постов',
  })
  @Get('types')
  public async postTypesAll() {
    const types = await this.postsService.postTypesAll();

    return fillDto(PostTypesRdo, { data: types });
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Получить пост по id',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Обновить пост по id',
  })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    const post = await this.postsService.update(id, updatePostDto);

    return fillDto(PostRdo, post);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Удалить пост по id',
  })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
