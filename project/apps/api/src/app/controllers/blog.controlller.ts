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
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { CreatePostApiDto } from '../dto/create-post.dto';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/userid.interceptor';
import { PostRdo } from '../rdo/post.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { fillDto } from '@project/shared/helpers';
import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostApiDto, @Req() req: any) {
    const userId = req['user']['sub'];

    const { data: post } = await this.httpService.axiosRef.post<PostRdo>(
      `${ApplicationServiceURL.Blog}/`,
      { ...dto, author: userId }
    );
    const { data: user } = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/info`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    const { data: file } = await this.httpService.axiosRef.get<UploadedFileRdo>(
      `${ApplicationServiceURL.FileVault}/${user.avatar}`
    );
    const author = { ...user, avatar: file.path };

    return fillDto(PostRdo, { ...post, author });
  }
}
