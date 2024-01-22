import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { extension } from 'mime-types';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number,
    private readonly allowedMimeTypes: string[]
  ) {}

  transform(value: Express.Multer.File) {
    if (!value) {
      throw new BadRequestException('File is not send.');
    }
    const { size, mimetype } = value;
    const fileExtension = extension(mimetype);

    if (!fileExtension || !this.allowedMimeTypes.includes(fileExtension)) {
      throw new BadRequestException('Invalid file format.');
    }

    if (size > this.maxSize) {
      throw new BadRequestException('File size exceeds the allowed limit.');
    }

    return value;
  }
}
