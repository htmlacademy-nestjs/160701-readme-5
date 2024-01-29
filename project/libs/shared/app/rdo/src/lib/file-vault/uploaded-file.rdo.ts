import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UploadedFileRdo {
  @ApiProperty({
    description: 'File id',
    example: '65aa94af93035c044aafb8d9',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'File originalName',
    example: 'cat.jpg',
  })
  @Expose()
  public originalName!: string;

  @ApiProperty({
    description: 'File hashName',
    example: 'cc24e4c7-503e-40ca-bb56-194a54359da6.png',
  })
  @Expose()
  public hashName!: string;

  @ApiProperty({
    description: 'File subDirectory',
    example: '2024/01',
  })
  @Expose()
  public subDirectory!: string;

  @ApiProperty({
    description: 'File mimetype',
    example: 'image/png',
  })
  @Expose()
  public mimetype!: string;

  @ApiProperty({
    description: 'File size',
    example: 22813,
  })
  @Expose()
  public size!: number;

  @ApiProperty({
    description: 'File path',
    example: '/2024/01/13a321fd-609c-4dab-9924-7cc1357cda4f.jpeg',
  })
  @Expose()
  public path!: string;
}
