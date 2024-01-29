import { ApiProperty } from '@nestjs/swagger';
import { PostRdo as BasePost, UserRdo } from '@project/rdo';
import { Expose } from 'class-transformer';

export class PostRdo extends BasePost {
  @Expose()
  @ApiProperty({
    type: UserRdo,
    description: 'Full author info',
  })
  public author!: UserRdo;
}
