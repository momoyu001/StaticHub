import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
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
   * 查询图片具体信息的接口
   * **/
  @Get('/img/:id')
  @HttpCode(200)
  async serveImage(@Param('id') id: string) {
    try {
      const result = await this.appService.getImageById(id);
      if (result) {
        const imageData = result[0];
        return {
          code: 0,
          success: true,
          message: 'success',
          result: imageData,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        code: 100,
        message: 'Error',
      };
    }
  }

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

  /**
   * 查询所有图片
   * **/
  @Post('/img/all')
  @HttpCode(200)
  async getImageList(@Body() body) {
    try {
      const result = (await this.appService.getImageList(body)) || [];
      return {
        code: 0,
        result: result.reverse(),
        message: 'success',
      };
    } catch (e) {
      console.log(e);
      return {
        code: 100,
        message: 'Error',
      };
    }
  }
}
