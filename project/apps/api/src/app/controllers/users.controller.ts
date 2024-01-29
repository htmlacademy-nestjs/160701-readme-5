import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CreateUserDtoWithAvatarFile } from '../dto/create-user.dto';
import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { AuthKeyName, fillDto } from '@project/shared/helpers';
import { ApiService } from '../service/api.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { RefreshUserRdo } from '../rdo/refresh-user.rdo';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ChangePasswordRdo } from '../rdo/change-password.rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';
import { FileValidationPipe } from '@project/shared/core';
import { Files } from '@project/shared/core';
const { ALLOWED_IMG_MIMETYPES, FileMaxSize } = Files;

@ApiTags('auth')
@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly apiService: ApiService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateUserDtoWithAvatarFile,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async register(
    @Body() dto: CreateUserDtoWithAvatarFile,
    @UploadedFile(
      new FileValidationPipe(FileMaxSize.Avatar, ALLOWED_IMG_MIMETYPES, true)
    )
    file: Express.Multer.File
  ) {
    let uploadedFile;

    if (file) {
      const form = new FormData();

      form.append('avatar', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      uploadedFile = await this.apiService.fileVault<UploadedFileRdo>({
        method: 'post',
        endpoint: 'upload/avatar',
        data: form,
      });
    }

    let user = await this.apiService.users<UserRdo>({
      method: 'post',
      endpoint: 'register',
      data: { ...dto, avatar: uploadedFile?.id },
    });

    return fillDto(UserRdo, { ...user, avatar: uploadedFile?.path });
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const data = await this.apiService.users<UserRdo>({
      method: 'post',
      endpoint: 'login',
      data: loginUserDto,
    });

    return data;
  }

  @ApiResponse({
    type: RefreshUserRdo,
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(CheckAuthGuard)
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const data = await this.apiService.users<UserRdo>({
      method: 'post',
      endpoint: 'refresh',
      options: this.apiService.getAuthorizationHeader(req),
    });

    return data;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiBearerAuth(AuthKeyName)
  @Get('info')
  public async info(@Req() req: Request) {
    let user = await this.apiService.users<UserRdo>({
      method: 'get',
      endpoint: 'info',
      options: this.apiService.getAuthorizationHeader(req),
    });
    console.log(user.avatar);

    if (user.avatar) {
      const file = await this.apiService.fileVault<UploadedFileRdo>({
        method: 'get',
        endpoint: user.avatar,
      });

      user.avatar = file.path;
    }

    return fillDto(UserRdo, user);
  }

  @ApiResponse({
    type: ChangePasswordRdo,
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  @ApiBearerAuth(AuthKeyName)
  @Patch('change-password')
  public async changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    const data = await this.apiService.users<UserRdo>({
      method: 'patch',
      endpoint: 'change-password',
      data: dto,
      options: this.apiService.getAuthorizationHeader(req),
    });

    return fillDto(ChangePasswordRdo, data);
  }
}
