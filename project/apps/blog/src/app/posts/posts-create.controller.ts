import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { PostType } from '@project/libs/shared/app/types';

import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from './dto/create/content';
import {
  LinkPostRdo,
  PhotoPostRdo,
  QuotePostRdo,
  TextPostRdo,
  VideoPostRdo,
} from './rdo/content';

@ApiTags('posts')
@Controller('posts')
export class PostsCreateController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    type: VideoPostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост с видео',
  })
  @Post(`/${PostType.Video}`)
  public async createVideo(@Body() createPostDto: CreateVideoPostDto) {
    const post = await this.postsService.create(PostType.Video, createPostDto);

    return fillDto(VideoPostRdo, post);
  }

  @ApiResponse({
    type: LinkPostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост со ссылкой',
  })
  @Post(`/${PostType.Link}`)
  public async createLink(@Body() createPostDto: CreateLinkPostDto) {
    const post = await this.postsService.create(PostType.Link, createPostDto);

    return fillDto(LinkPostRdo, post);
  }

  @ApiResponse({
    type: PhotoPostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост с фото',
  })
  @Post(`/${PostType.Photo}`)
  public async createPhoto(@Body() createPostDto: CreatePhotoPostDto) {
    const post = await this.postsService.create(PostType.Photo, createPostDto);

    return fillDto(PhotoPostRdo, post);
  }

  @ApiResponse({
    type: QuotePostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост с фото',
  })
  @Post(`/${PostType.Quote}`)
  public async createQuote(@Body() createPostDto: CreateQuotePostDto) {
    const post = await this.postsService.create(PostType.Quote, createPostDto);

    return fillDto(QuotePostRdo, post);
  }

  @ApiResponse({
    type: TextPostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост с текстом',
  })
  @Post(`/${PostType.Text}`)
  public async createText(@Body() createPostDto: CreateTextPostDto) {
    const post = await this.postsService.create(PostType.Text, createPostDto);

    return fillDto(TextPostRdo, post);
  }
}
