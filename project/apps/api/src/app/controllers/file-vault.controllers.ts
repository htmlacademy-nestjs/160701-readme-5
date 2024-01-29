import 'multer';
import {
  Controller,
  HttpStatus,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/userid.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import FormData from 'form-data';
import { ApiService } from '../service/api.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';

@ApiTags('files')
@UseFilters(AxiosExceptionFilter)
@Controller('files')
export class FileVaultController {
  constructor(private readonly apiService: ApiService) {}

  //   @UseGuards(CheckAuthGuard)
  @ApiOperation({ summary: 'Загрузить файл аватара' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.CREATED,
    description: 'File uploaded successfully',
  })
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'PNG or JPG file',
          enum: ['image/png', 'image/jpeg'],
        },
      },
    },
  })
  @UseInterceptors(UserIdInterceptor)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/upload/avatar')
  public async create(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    const form = new FormData();

    form.append('avatar', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const data = await this.apiService.fileVault({
      method: 'post',
      endpoint: 'upload/avatar',
      data: form,
    });

    return data;
  }
}
