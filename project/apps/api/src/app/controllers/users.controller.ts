import { Body, Controller, Get, Post, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CreateUserDto } from '../dto/create-user.dto';
import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { fillDto } from '@project/shared/helpers';
import { ApiService } from '../service/api.service';

@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly apiService: ApiService) {}

  @Post('register')
  public async register(@Body() dto: CreateUserDto) {
    const user = await this.apiService.users<UserRdo>({
      method: 'post',
      endpoint: 'register',
      data: dto,
    });

    const file = await this.apiService.fileVault<UploadedFileRdo>({
      method: 'get',
      endpoint: user.avatar,
    });

    return fillDto(UserRdo, { ...user, avatar: file.path });
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const data = await this.apiService.users<UserRdo>({
      method: 'post',
      endpoint: 'login',
      data: loginUserDto,
    });

    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const data = await this.apiService.users<UserRdo>({
      method: 'post',
      endpoint: 'refresh',
      options: this.apiService.getAuthorizationHeader(req),
    });

    return data;
  }

  @Get('info')
  public async info(@Req() req: Request) {
    const user = await this.apiService.users<UserRdo>({
      method: 'get',
      endpoint: 'info',
      options: this.apiService.getAuthorizationHeader(req),
    });

    const file = await this.apiService.fileVault<UploadedFileRdo>({
      method: 'get',
      endpoint: user.avatar,
    });

    return fillDto(UserRdo, { ...user, avatar: file.path });
  }
}
