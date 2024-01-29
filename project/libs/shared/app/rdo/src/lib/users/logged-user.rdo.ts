import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  public email!: string;

  @Expose()
  @ApiProperty({
    description: 'Token',
    example:
      'eyJlbWFpbCI6IjFAMS5ydSIsImlkIjoiNjQ5ZThiYzc5OWU1ZGI3YjVhNmY2ZmI0IiwiaWF0IjoxNjg4MTEyMzgwLCJleHAiOjE2ODgyODUxODB9',
  })
  public accessToken!: string;

  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJlbWFpbCI6IjFAMS5ydSIsImlkIjoiNjQ5ZThiYzc5OWU1ZGI3YjVhNmY2ZmI0IiwiaWF0IjoxNjg4MTEyMzgwLCJleHAiOjE2ODgyODUxODB9',
  })
  @Expose()
  public refreshToken!: string;
}
