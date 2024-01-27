import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { Request } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  public async register(@Body() dto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      dto
    );
    return data;
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
}
