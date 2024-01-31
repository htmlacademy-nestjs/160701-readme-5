import { CreatePostDto } from '@project/dto';
import { OmitType } from '@nestjs/swagger';

export class CreatePostApiDto extends OmitType(CreatePostDto, [
  'author',
] as const) {}
