import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(
          'application.uploadDirectory'
        );
        const serveRoot = configService.get<string>('application.serveRoot');
        return [
          {
            rootPath,
            serveRoot,
            serveStaticOptions: {
              fallthrough: true,
            },
          },
        ];
      },
    }),
  ],
  providers: [FileUploaderService],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
