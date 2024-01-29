import { ApiProperty } from '@nestjs/swagger';
import { User } from '@project/libs/shared/app/types';
import { Expose } from 'class-transformer';

export class UserRdo implements Omit<User, 'role'> {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  public avatar!: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  public email!: string;

  @Expose()
  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  public firstname!: string;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'User create date',
    example: '2024-01-09T14:55:34.697Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'User publications count',
    example: '10',
  })
  public publicationsCount!: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'User subscribers count',
    example: '10',
  })
  public subscribersCount!: number;
}
