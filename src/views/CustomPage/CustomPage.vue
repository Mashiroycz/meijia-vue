<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import UiContentCard from '../UI/UiContentCard.vue'
import CustomDetail from './CustomDetail/index.vue'
import { getCustomList } from './mock'
import type { Customer } from './CustomDetail/index.vue'
const configCustomTable = ref({
  default: [
    {
      label: '姓名',
      prop: 'name'
    },

    {
      label: '备注名',
      prop: 'otherName'
    },
    {
      label: '手机号',
      prop: 'phone',
      width: '120'
    },
    {
      label: '微信号',
      prop: 'vxNumber'
    },
    {
      label: '年龄',
      prop: 'birthYear'
    },
    {
      label: '职业',
      prop: 'occupation'
    },
    {
      label: '地址',
      prop: 'address'
    },
    {
      label: '描述',
      prop: 'description'
    },
    {
      label: '健康状况',
      prop: 'disease'
    },
    {
      label: '体重',
      prop: 'weight'
    },
    {
      label: '身高',
      prop: 'height'
    },
    {
      label: '创建日期',
      prop: 'createDate'
    }
  ]
})
const customerList = ref([])

// 弹窗相关
const dialogVisible = ref(false)

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

const currentFormMsg = ref<Customer | null>(null)

const inputMsg = ref(undefined)

const handleDetail = (data: Customer) => {
  currentFormMsg.value = data
  dialogVisible.value = true
  console.log(dialogVisible.value, 'dialogVisible.value')
}

onMounted(() => {
  getCustomList((res: any) => {
    console.log(res)
    customerList.value = res.data
  })
})
</script>

<template>
  <UiContentCard>
    <div>
      <el-input v-model="inputMsg" />
      <el-button
        @click="
          () => {
            console.log(inputMsg)
            const formData = {
              customerId: inputMsg
            }
            myfetch(formData)
          }
        "
        >查询</el-button
      >
      <el-button @click="() => {}">自定义设置</el-button>
    </div>
    <div class="a1">
      <el-table :data="customerList" style="width: 100%" class="table" stripe>
        <el-table-column fixed type="index" label="序号" width="60" />
        <template v-for="item in configCustomTable.default">
          <el-table-column
            v-if="item.prop !== 'phone'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width ? item.width : ''"
          />
          <el-table-column
            v-if="item.prop === 'phone'"
            :label="item.label"
            :width="item.width ? item.width : ''"
          >
            <template #default="scope">
              <div>
                <div v-for="phoneText in scope.row.phone">{{ phoneText }}</div>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="address" label="Address" />
        <el-table-column fixed="right" label="操作" width="220" align="center">
          <template #default="scope">
            <el-button size="small" @click="handleEdit()"> 编辑 </el-button>
            <el-button size="small" @click="handleDetail(scope.row)"> 详情 </el-button>
            <el-button size="small" type="danger" @click="handleDelete()"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </UiContentCard>
  <div v-if="dialogVisible">
    <CustomDetail
      :formData="currentFormMsg"
      @setDialogVisible="
        (isVisible) => {
          dialogVisible = isVisible
        }
      "
    />
  </div>
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
