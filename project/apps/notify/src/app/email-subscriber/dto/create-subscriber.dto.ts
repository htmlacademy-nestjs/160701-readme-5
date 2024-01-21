import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  FIRST_NAME_IS_EMPTY,
  USER_ID_IS_EMPTY,
} from '../email-subscriber.constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriberDto {
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

  @ApiProperty({
    description: 'User lastname',
    example: 'Ivanov',
  })
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  public lastname!: string;
}