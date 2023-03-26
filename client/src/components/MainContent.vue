<template>
  <div class="main-content-module">
    <div class="main-content">
      <div class="main-content-title">输入内容搜索图片</div>
      <div class="search-box">
        <el-input v-model="search" placeholder="输入内容搜索图片" />
        <el-button class="button" type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <div class="table-list-box">
        <TableList :data="data" :total="total"></TableList>
      </div>
      <Upload></Upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TableList from './TableList.vue'
import Upload from '@/components/Upload.vue'

import { ref, computed, onMounted } from 'vue'

import { useRequest } from '@/utils/use-request'

const { $axios } = useRequest()

let data = ref([])

let search = ref('')

let total = computed(() => {
  return data.value.length
})

onMounted(async () => {
  const result: { code: string; message: string; result: any } = await $axios.post('/img/all', {})
  data.value = result.result
})

const handleSearch = () => {
  console.log('搜索', search.value)
}
</script>

<style scoped lang="less">
@header-height: 80px;

.main-content-module {
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #f1f3f4;
  padding-bottom: 30px;
  .main-content {
    padding: 20px;

    width: 1000px;
    min-height: 100%;
    margin: 0 auto;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .main-content-title {
      font-size: 20px;
      font-weight: 500;
    }
    .search-box {
      display: flex;
      align-items: center;
      margin: 40px 0;
      .button {
        margin-left: 20px;
      }
    }
  }
}
</style>
