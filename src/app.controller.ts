import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { MulterFile } from 'multer';
import { ImageOuterType, ImageInnerType } from './types';
import { generateUUID, getDate } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 测试接口
   * **/
  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * 上传图片的接口
   * **/
  @Post('/img/upload')
  @HttpCode(200)
  async uploadImage(@Body() imageParam: ImageOuterType) {
    const { name, content, type } = imageParam;

    const param: ImageInnerType = {
      id: generateUUID(),
      name,
      content,
      preview: content,
      createDate: getDate(),
      url: '',
      type,
    };

    const createdImage = await this.appService.create(param);
    console.log('接口返回值：', createdImage);

    return {
      success: true,
      code: 0,
    };
  }
}
