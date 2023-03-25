<template>
  <div class="table-list-module">
    <el-table :data="data" :border="true" style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column prop="preview" label="预览">
        <template #default="scope">
          <img class="preview-img" :src="scope.row.preview" alt="图片预览" srcset="" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      layout="prev, pager, next, ->, total"
      :total="total"
      @prev-click="preClick"
      @next-click="nextClick"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
interface dataType {
  id: number
  name: string
  address: string
  note: string
  preview: string
}

interface Props {
  data: dataType[]
  total: number
}

withDefaults(defineProps<Props>(), {
  data: () => []
})

function preClick(value: number) {
  console.log('页码：', value)
}

function nextClick(value: number) {
  console.log('页码：', value)
}

function currentChange(value: number) {
  console.log('页码：', value)
}
</script>

<style scoped lang="less">
@border-color: #c4c8ca;
.table-list-module {
  .pagination {
    margin-top: 20px;
  }
  .preview-img {
    width: 100px;
    height: 60px;
  }
}
</style>
