import {
  Body,
  Controller,
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
import { PostRdo } from '../rdo/post.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { fillDto } from '@project/shared/helpers';
import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';
import { ApiService } from '../service/api.service';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly apiService: ApiService) {}

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

    const user = await this.apiService.users<UserRdo>({
      method: 'get',
      endpoint: 'info',
      options: this.apiService.getAuthorizationHeader(req),
    });

    const file = await this.apiService.fileVault<UploadedFileRdo>({
      method: 'get',
      endpoint: user.avatar,
    });

    const author = { ...user, avatar: file.path };

    return fillDto(PostRdo, { ...post, author });
  }
}
