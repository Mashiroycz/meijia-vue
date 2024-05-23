<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import UiDetailSection from './UiDetailSection.vue'

interface Props {
  // dialogVisible: boolean
  formData: Customer | null
}

export interface Customer {
  name?: string
  otherName?: string
  birthYear?: string
  remarks?: string
  address?: string
  phone?: Array<string>
  vxNumber?: Array<string>
  height?: number
  weight?: number
  decription?: string
  createDate?: Date
  occupation?: string
  disease?: string
}
const props = defineProps<Props>()

const visible = ref(false)

const type = ref('edit')

const emit = defineEmits<{
  setDialogVisible: [visible: boolean]
}>()

const form: Customer = reactive({
  name: undefined,
  otherName: undefined,
  birthYear: undefined,
  remarks: undefined,
  address: undefined,
  phone: undefined,
  vxNumber: undefined,
  height: undefined,
  weight: undefined,
  decription: undefined,
  createDate: undefined
})

const handleChangeType = () => {
  const defaultTypeArr = ['edit', 'show']
  console.log(type.value)
  if (type.value === 'edit') {
    type.value = 'show'
  } else {
    type.value = 'edit'
  }
}

const handleClose = () => {
  emit('setDialogVisible', false);
}

onMounted(() => {
  visible.value = true
  console.log(props.formData, '    Object.assign(form, props.formData);  ')
  Object.assign(form, props.formData)
})
</script>

<template>
  <el-dialog class="detail-dialog" v-model="visible" title="详情" width="1000" @close="handleClose">
    <div class="main">
      <el-form class="customer-form" :model="form">
        <!-- <UiDetailSection title="基本信息">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="备注名">
                <el-input v-model="form.otherName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
          </el-row>
        </UiDetailSection>
        <UiDetailSection title="联系方式">
          <div>hang</div>
        </UiDetailSection>
        <UiDetailSection title="健康状况">
          <div>hang</div>
        </UiDetailSection>
        <UiDetailSection title="其他信息">
          <div>hang</div>
        </UiDetailSection> -->
        <el-button type="primary" @click="handleChangeType">{{ type }}</el-button>
        <el-descriptions class="margin-top" title="基本信息" :column="3" border>
          <template #extra>
            <el-button type="primary">Operation</el-button>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">备注名</div>
            </template>
            <el-form-item v-if="type === 'edit'">
              <el-input v-model="form.otherName" />
            </el-form-item>
            <div v-if="type === 'show'">{{ form.otherName }}</div>
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">姓名</div>
            </template>
            <el-form-item v-if="type === 'edit'">
              <el-input v-model="form.name" />
            </el-form-item>
            <div v-if="type === 'show'">{{ form.name }}</div>
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">年龄</div>
            </template>
            <el-form-item v-if="type === 'edit'">
              <el-input v-model="form.birthYear" />
            </el-form-item>
            <div v-if="type === 'show'">{{ form.birthYear }}</div>
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">职业</div>
            </template>
            <el-form-item v-if="type === 'edit'">
              <el-input v-model="form.occupation" />
            </el-form-item>
            <div v-if="type === 'show'">{{ form.occupation }}</div>
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">疾病</div>
            </template>
            <el-form-item v-if="type === 'edit'">
              <el-input v-model="form.disease" />
            </el-form-item>
            <div v-if="type === 'show'">{{ form.disease }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emit('setDialogVisible', false)">Cancel</el-button>
        <el-button type="primary" @click="emit('setDialogVisible', false)"> Confirm </el-button>
        <el-button type="primary" @click="emit('setDialogVisible', false)"> Confirm 2</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.customer-form .el-form-item {
  margin-bottom: 0;
}
</style>
<style>
.detail-dialog.el-dialog {
  padding: 20px 30px;
}
/* .customer-form .el-form-item{
  margin-bottom: 0;
} */
</style>
