import { ApiProperty } from '@nestjs/swagger';
import { PostRdo as BasePost } from '@project/rdo';
import { Expose } from 'class-transformer';

export class PostRdo extends BasePost {
  @Expose()
  @ApiProperty({
    description: 'The uniq author(user) ID',
  })
  public author!: string;
}
