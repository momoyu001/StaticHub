import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { MulterFile } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: MulterFile) {
    /**
     * 生成 uuid
     */
    function generateUUID() {
      let d = new Date().getTime();
      if (
        typeof performance !== 'undefined' &&
        typeof performance.now === 'function'
      ) {
        d += performance.now();
      }
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        },
      );
      return uuid;
    }

    console.log('image：', image);
    const imageName = image.originalname;
    const imageData = image.buffer.toString('base64');
    const imageUrl = `http://localhost:3000/${imageName}`;
    const createdImage = await this.appService.create(
      generateUUID(),
      imageName,
      imageData,
      imageUrl,
      imageUrl,
    );
    return {
      url: createdImage.url,
    };
  }
}
