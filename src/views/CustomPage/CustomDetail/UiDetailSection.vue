<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="main">
    <div class="title">{{ props.title }}</div>
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<style scoped>
.main {
  margin-bottom: 20px;
  .title {
    color: green;
    padding-left: 4px;
    font-weight: 600;
    margin-bottom: 6px
  }
}
</style>
