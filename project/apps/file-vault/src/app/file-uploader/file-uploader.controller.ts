import 'multer';
import { Express } from 'express';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaderService } from './file-uploader.service';
import { MongoIdValidationPipe } from '@project/shared/core';
import { fillDto, generateSchemeApiError } from '@project/shared/helpers';
import { UploadedFileRdo } from '@project/rdo';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileValidationPipe } from '@project/shared/core';
import {
  ALLOWED_IMG_MIMETYPES,
  User,
  PostContentValidator,
} from '@project/validation';

@ApiTags('files')
@Controller('files')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.CREATED,
    description: 'File uploaded successfully',
  })
  @ApiOperation({ summary: 'Загрузить файл аватара' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          maxLength: User.avatar.FileMaxSize,
          description: 'PNG or JPG file',
          enum: ['image/png', 'image/jpeg'],
        },
      },
    },
  })
  @Post('/upload/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatarFile(
    @UploadedFile(
      new FileValidationPipe(User.avatar.FileMaxSize, ALLOWED_IMG_MIMETYPES)
    )
    file: Express.Multer.File
  ) {
    const existFile = await this.fileUploaderService.saveFile(file);

    return fillDto(UploadedFileRdo, existFile.toPOJO());
  }

  @ApiOperation({ summary: 'Загрузить файл изображения поста' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
          maxLength: PostContentValidator.photo.file.FileMaxSize,
          description: 'PNG or JPG file',
          enum: ['image/png', 'image/jpeg'],
        },
      },
    },
  })
  @Post('/upload/post/photo')
  @UseInterceptors(FileInterceptor('photo'))
  public async uploadPostPhotoFile(
    @UploadedFile(
      new FileValidationPipe(
        PostContentValidator.photo.file.FileMaxSize,
        ALLOWED_IMG_MIMETYPES
      )
    )
    file: Express.Multer.File
  ) {
    const existFile = await this.fileUploaderService.saveFile(file);

    return fillDto(UploadedFileRdo, existFile.toPOJO());
  }

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: 'File founded successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'File not found',
    schema: generateSchemeApiError('File not found', HttpStatus.NOT_FOUND),
  })
  @ApiOperation({ summary: 'Получить файл по ID' })
  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile.toPOJO());
  }
}
