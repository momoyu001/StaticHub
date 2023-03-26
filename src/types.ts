/**
 * 图片 model 类型 - 数据表字段
 */
export interface ImageInnerType {
  id: string;
  name: string;
  content: string;
  preview: string;
  createDate: string;
  url: string;
  type: string;
}

/**
 * 上传图片接口参数类型
 * **/
export interface ImageOuterType {
  name: string;
  content: string;
  type: string;
}
