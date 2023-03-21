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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: MulterFile) {
    console.log('image：', image);
    const imageName = image.originalname;
    const imageData = image.buffer.toString('base64');
    const imageUrl = `http://localhost:3000/${imageName}`;
    const createdImage = await this.appService.create(
      imageName,
      imageData,
      imageUrl,
    );
    return {
      url: createdImage.url,
    };
  }
}
