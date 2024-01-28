import { CreatePostDto } from '@project/dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreatePostApiDto extends OmitType(CreatePostDto, ['author']) {}
