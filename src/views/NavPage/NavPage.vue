<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { RouterLink, RouterView } from 'vue-router'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// const handleOpenClose = () => {
//   isCollapse.value = !isCollapse.value;
// }
</script>

<template>
  <el-menu
    default-active="2"
    class="nav-main-container"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <!-- <div>
      <el-radio-group v-model="isCollapse">
        <el-radio-button :value="false">expand</el-radio-button>
        <el-radio-button :value="true">collapse</el-radio-button>
      </el-radio-group>
    </div> -->
    <!-- <div>
      <el-button @click="handleOpenClose">展开</el-button>
    </div> -->
    <RouterLink to="/">
      <el-menu-item index="1">
        <el-icon><location /></el-icon>
        <template #title> 首页 </template>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/custom">
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title> 顾客管理 </template>
      </el-menu-item>
    </RouterLink>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <template #title>数据统计</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>服务记录</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><setting /></el-icon>
      <template #title>营销管理</template>
    </el-menu-item>
    <RouterLink to="/workFlow">
      <el-menu-item index="6">
        <el-icon><setting /></el-icon>
        <template #title>工作流</template>
      </el-menu-item>
    </RouterLink>
  </el-menu>
</template>

<style>
.nav-main-container {
  height: 100%;
  margin-top: 10px;
}
.nav-main-container:not(.el-menu--collapse) {
  width: 140px;
  border-top: 2px solid #f7f7f7;
  height: 100%;
}
</style>
