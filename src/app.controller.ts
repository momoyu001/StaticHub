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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/img/upload')
  @HttpCode(200)
  async uploadImage(@Body() imageParam: ImageOuterType) {
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

    /**
     * 获取当前时间
     */
    function getDate() {
      const now = Date.now();
      const date = new Date(now);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}-${month}-${day}`;
    }

    const param: ImageInnerType = {
      id: generateUUID(),
      name: imageParam.name,
      content: imageParam.content,
      preview: imageParam.content,
      createDate: getDate(),
      url: '',
    };

    const createdImage = await this.appService.create(param);
    console.log('接口返回值：', createdImage);

    return {
      success: true,
      code: 0,
    };
  }
}
