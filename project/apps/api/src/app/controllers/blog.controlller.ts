import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CreatePostApiDto } from '../dto/create-post.dto';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/userid.interceptor';
import { AuthKeyName, fillDto } from '@project/shared/helpers';
import { UploadedFileRdo, PostRdo, UserRdo } from '@project/rdo';
import { ApiService } from '../service/api.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly apiService: ApiService) {}

  @ApiBearerAuth(AuthKeyName)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
  })
  @ApiOperation({
    summary: 'Создать пост',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostApiDto, @Req() req: any) {
    const userId = req['user']['sub'];

    const post = await this.apiService.blog<PostRdo>({
      method: 'post',
      endpoint: '',
      data: { ...dto, author: userId },
    });

    let user = await this.apiService.users<UserRdo>({
      method: 'get',
      endpoint: 'info',
      options: this.apiService.getAuthorizationHeader(req),
    });

    if (user.avatar) {
      const file = await this.apiService.fileVault<UploadedFileRdo>({
        method: 'get',
        endpoint: user.avatar,
      });

      user.avatar = file.path;
    }

    return fillDto(PostRdo, { ...post, author: user });
  }
}
