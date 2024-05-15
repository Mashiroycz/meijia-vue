<script setup lang="ts">
import { ref, reactive } from 'vue'
import UiContentCard from '../UI/UiContentCard.vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const myfetch = (formData: any) => {
  fetch('http://localhost:8080/getCustomers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData) // 将数据对象转换为JSON字符串
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error))
}

const handleEdit = () => {}
const handleDelete = () => {}

const inputMsg = ref(undefined)
</script>

<template>
  <UiContentCard>
    <div>
      <el-input type="number" v-model="inputMsg" />
      <el-button
        @click="
          () => {
            console.log(inputMsg)
            const formData = {
              customerId: inputMsg
            }
            myfetch(formData);
          }
        "
        >查询</el-button
      >
    </div>
    <div class="a1">
      1
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="name" label="操作" width="180">
          <el-button size="small" @click="handleEdit()"> 编辑 </el-button>
          <el-button size="small" type="danger" @click="handleDelete()"> 删除 </el-button>
        </el-table-column>
      </el-table>
    </div>
  </UiContentCard>
</template>

<style scoped>
.a1 {
  width: 100%;
  background-color: aqua;
  .table {
    width: at;
  }
}
</style>
