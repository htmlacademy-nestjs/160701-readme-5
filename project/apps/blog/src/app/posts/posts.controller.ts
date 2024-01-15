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

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Получить все посты',
  })
  @Get()
  public async findAll() {
    return this.postsService.findAll();
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

  @ApiOperation({
    summary: 'Получить пост по id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(id, updatePostDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
