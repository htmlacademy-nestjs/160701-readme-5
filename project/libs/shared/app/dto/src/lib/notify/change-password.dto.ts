import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
  USER_ID_IS_EMPTY,
} from './create-subscriber.const';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeSubscriberPasswordDto {
  @ApiProperty({
    description: 'User id',
    example: '65ae5755dde1bee5f9fc7d22',
  })
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  public userId!: string;

  @ApiProperty({
    description: 'User email',
    example: 'keks@academy.com',
  })
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'Keks',
  })
  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public firstname!: string;
}
