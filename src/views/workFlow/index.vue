<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'

const container = ref()
const lf = ref<LogicFlow>()

const data = {
  // 节点
  nodes: [
    {
      id: '21',
      type: 'rect',
      x: 100,
      y: 200,
      text: '矩形节点'
    },
    {
      id: '50',
      type: 'circle',
      x: 300,
      y: 400,
      text: '圆形节点'
    }
  ],
  // 边
  edges: [
    {
      type: 'polyline',
      sourceNodeId: '50',
      targetNodeId: '21'
    }
  ]
}

onMounted(() => {
  lf.value = new LogicFlow({
    // 通过选项指定了渲染的容器和需要显示网格
    container: container.value,
    grid: true
  })
  lf.value.render(data)
})
</script>

<template>
  <div>
    <div>titlework</div>
    <div id="container" ref="container"></div>
  </div>
</template>

<style scoped>
.container {
  width: 500px;
  height: 400px;
}
</style>
