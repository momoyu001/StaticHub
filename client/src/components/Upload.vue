<template>
  <div class="upload-module">
    <el-icon size="40" color="#409eff" @click="uploadClick"><Upload /></el-icon>
    <el-drawer v-model="isOpen" direction="rtl">
      <template #default>
        <el-radio-group
          class="upload-type-group"
          v-model="uploadType"
          @change="handleOnRadioChange"
        >
          <el-radio label="local">选择本地图片上传</el-radio>
          <el-radio label="paste">粘贴图片上传</el-radio>
        </el-radio-group>

        <div class="upload-box">
          <template v-if="uploadType === 'local'">
            <!-- 本地选择图片上传 -->
            <el-upload
              ref="uploadRef"
              v-model:file-list="fileList"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-change="handleChange"
              :on-exceed="handleOnExceed"
              :before-upload="handleBeforeUpload"
              :auto-upload="false"
              :action="action"
              :limit="1"
            >
              <template #trigger>
                <el-button type="primary">选择图片</el-button>
              </template>
            </el-upload>
          </template>
          <template v-else>
            <!-- 粘贴图片上传 -->
          </template>
        </div>

        <div class="upload-button">
          <el-button type="primary" class="upload-confirm" @click="uploadConfirm"
            >确认上传</el-button
          >
        </div>
      </template>
    </el-drawer>

    <!-- 预览图片弹窗 -->
    <el-dialog v-model="dialogVisible" title="图片预览" width="600px" :before-close="doCloseDialog">
      <img class="img" w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { type UploadProps, type UploadUserFile, type UploadInstance, ElMessage } from 'element-plus'
import type { ImageData } from '@/types/index'

import { useRequest } from '@/utils/use-request'

const { $axios } = useRequest()

let isOpen = ref(false)
let uploadType = ref('local')
let dialogVisible = ref(false)
let dialogImageUrl = ref('')
let uploadRef = ref<UploadInstance>()
let loading = ref(false)
let imgContent = ref('')
let imgName = ref('')
let imgType = ref('')
let action = ''

const fileList = ref<UploadUserFile[]>([])

const uploadClick = () => {
  isOpen.value = true
}

const handleOnRadioChange = (value: string) => {
  console.log(value)
  console.log('切换 radio')
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log('移除图片')
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log('预览图片')
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  console.log(response, uploadFile, uploadFiles)
  console.log('上传成功')
}

const handleChange: UploadProps['onChange'] = async (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)

  loading.value = true

  // 使用 FileReader 将图片转换为 base64
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw as Blob)
  reader.onload = async () => {
    loading.value = false
    imgName.value = uploadFile.name
    imgType.value = uploadFile.name.split('.')[1]
    imgContent.value = reader.result as string
  }
}
const handleOnExceed: UploadProps['onExceed'] = (files: File[], uploadFiles: UploadUserFile[]) => {
  console.log(files, uploadFiles)
  console.log('超出限制')
  ElMessage.warning('一次只能上传一张图片哦')
}

const handleBeforeUpload: UploadProps['beforeUpload'] = () => {
  console.log('上传之前')
}

const uploadConfirm = async () => {
  console.log('确认上传')
  if (loading.value) {
    ElMessage.warning('图片还未准备就绪')
    return
  }

  const param: ImageData = {
    name: imgName.value,
    content: imgContent.value,
    type: imgType.value
  }

  const result: { code: number; message: string } = await $axios.post('/img/upload', param)
  if (result.code === 0) {
    ElMessage.success('上传成功')
  }
  console.log('接口返回值：', result)
}

const doCloseDialog = (done: () => void) => {
  console.log('关闭弹窗')
  done()
}
</script>

<style scoped lang="less">
.upload-module {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: #fff;
  position: fixed;
  top: 250px;
  right: 100px;
  z-index: 2001;
  cursor: pointer;
  padding: 5px;
  box-shadow: 0px 6px 20px #59a8dc;
}
.upload-type-group {
  margin: 10px 0 20px;
}
.upload-box {
  .upload-confirm {
    margin-top: 30px;
  }
}
.upload-button {
  position: absolute;
  top: 350px;
  right: 30px;
}

/deep/ .el-dialog__header {
  height: 54px;
}

.img {
  width: 550px;
  margin: 0px auto;
}
</style>
