<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>

<template>
  <div class="content-card">
    <slot />
  </div>
</template>

<style scoped>
.content-card{
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  overflow: hidden;
  color: (#303133);
  transition: .3s;
}
</style>