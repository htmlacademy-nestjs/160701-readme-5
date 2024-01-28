import { Body, Controller, Get, Post, Req, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { Request } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CreateUserDto } from '../dto/create-user.dto';
import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { fillDto } from '@project/shared/helpers';

@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  public async register(@Body() dto: CreateUserDto) {
    const { data: user } = await this.httpService.axiosRef.post<UserRdo>(
      `${ApplicationServiceURL.Users}/register`,
      dto
    );

    const { data: file } = await this.httpService.axiosRef.get<UploadedFileRdo>(
      `${ApplicationServiceURL.FileVault}/${user.avatar}`
    );

    return fillDto(UserRdo, { ...user, avatar: file.path });
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @Get('info')
  public async info(@Req() req: Request) {
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

    return fillDto(UserRdo, { ...user, avatar: file.path });
  }
}
