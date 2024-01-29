import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { extension } from 'mime-types';
import 'multer';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number,
    private readonly allowedMimeTypes: string[],
    private readonly isOptional: boolean = false
  ) {}

  transform(file: Express.Multer.File) {
    if (!this.isOptional && !file) {
      throw new BadRequestException('File is not send.');
    }
    if (file) {
      const { size, mimetype, originalname } = file;
      const fileExtension =
        extension(mimetype) || originalname.split('.').pop();

      if (!fileExtension || !this.allowedMimeTypes.includes(fileExtension)) {
        throw new BadRequestException('Invalid file format.');
      }

      if (size > this.maxSize) {
        throw new BadRequestException('File size exceeds the allowed limit.');
      }

      return file;
    }
  }
}
