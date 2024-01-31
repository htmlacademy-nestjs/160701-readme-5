import { ApiProperty } from '@nestjs/swagger';
import { Like } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class LikeRdo implements Like {
  @Expose()
  @ApiProperty({
    description: 'The uniq like ID',
    example: '65b809b8d6443b043b33eedb',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Create like date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Like user id',
    example: '65b809b8d6443b043b33eedb',
  })
  public userId!: string;

  @Expose()
  @ApiProperty({
    description: 'Like post id',
    example: '65b809b8d6443b043b33eedb',
  })
  public postId!: string;
}
