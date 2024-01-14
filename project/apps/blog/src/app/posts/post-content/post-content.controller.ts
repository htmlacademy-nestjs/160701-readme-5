import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PostContentService } from './post-content.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostType } from '@project/libs/shared/app/types';

@ApiTags('content')
@Controller('posts/content')
export class PostContentController {
  constructor(private readonly postContentService: PostContentService) {}

  @Get(':id')
  @ApiQuery({
    name: 'postType',
    enum: PostType,
  })
  public async findOne(
    @Param('id') id: string,
    @Query('postType') postType: PostType
  ) {
    const entity = await this.postContentService.findById(postType, id);

    if (!entity) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }

    return entity.toPOJO();
  }
}
