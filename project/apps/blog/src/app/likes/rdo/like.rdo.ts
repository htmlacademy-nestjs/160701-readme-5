import { ApiProperty } from '@nestjs/swagger';
import { Like } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class LikeRdo implements Like {
  @Expose()
  @ApiProperty({
    description: 'The uniq like ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
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
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public userId!: string;

  @Expose()
  @ApiProperty({
    description: 'Like post id',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public postId!: string;
}
