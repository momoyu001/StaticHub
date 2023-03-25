<template>
  <div class="header-module">
    <div class="header-left">
      <HomeIcon class="home-icon"></HomeIcon>
      <div class="title">momoyu</div>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script lang="ts" setup>
import HomeIcon from '../components/icons/HomeIcon.vue'
</script>

<style scoped lang="less">
.header-module {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  box-shadow: 2px 12px 12px #e9e6e6;
  padding: 0 20px;

  .header-left {
    display: flex;
    align-items: center;

    .title {
      margin-left: 20px;
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>
