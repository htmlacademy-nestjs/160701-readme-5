import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiResponseError {
  @Expose()
  @ApiProperty({
    description: 'Error text message',
    example: 'Text message',
  })
  message!: string;

  @Expose()
  @ApiProperty({
    description: 'Error type',
    example: 'Conflict',
  })
  error!: string;

  @Expose()
  @ApiProperty({
    description: 'Error statusCode',
    example: 409,
  })
  statusCode!: number;
}
