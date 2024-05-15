<script setup lang="ts">
import { ref, reactive } from 'vue'

// 数据    所属部门      年份
//  id1   "技术部",    "2019",
//  id2   "技术部",    "2019",

//  id3   "开发部",    "2019",
//  id4   "技术部",    "2018",

//  id5   "技术部",    "2020",
//  id6   "技术部",    "2020",

const data = [
  {
    f1: '技术部',
    f2: '2019',
    f3: 'a1',
    f4: 'x1',
    num: 2
  },
  {
    f1: '开发部',
    f2: '2019',
    f3: 'a1',
    f4: 'x2',
    num: 1
  },
  {
    f1: '技术部',
    f2: '2019',
    f3: 'a2',
    f4: 'x1',
    num: 1
  },
  {
    f1: '技术部',
    f2: '2018',
    f3: 'a1',
    f4: 'x1',
    num: 6
  }
  // {
  //   f1: '技术部',
  //   f2: '',
  //   f3: 'a1',
  //   f4: 'x2',
  //   num: 7
  // }
]

const createArr = ref([])
const theMap = ref(null)
// 纵向分组字段1
const List1 = ['技术部', '开发部']
// 纵向分组字段2
const List2 = ['2018', '2019', '2020', '2021']
// 横向分组字段1
const List3 = ['a1', 'a2', 'a3', 'a4', 'a5']
// 横向分组字段2
const List4 = ['x1', 'x2']

//  纵1，横1  ； 纵1，纵2，横1  ； 纵1，横1，横2   ；纵1，纵2，横1，横2

const type = {
  col: [1,2],
  row: [1,2]
}

const transData = (data: any) => {
  let obj: any = {}
  const findIndex = (list: any, value: any) => {
    let indexNum = undefined
    list.forEach((item: any, index: number) => {
      if (item === value) {
        indexNum = index + 1
      }
    })
    return indexNum
  }
  data.forEach((item: any) => {
    const list = [
      findIndex(List1, item.f1),
      findIndex(List2, item.f2),
      findIndex(List3, item.f3),
      findIndex(List4, item.f4)
    ]
    console.log(list, List3, item.f3)
    obj[list.join(',')] = item.num
  })
  return obj
}

const createArrFun = () => {
  if(type.col.length===1 && type.row.length===1){
    return Array.from({ length: List3.length + 1 })
  }
  if(type.col.length===1 && type.row.length===2){
    return Array.from({ length: List3.length * (List4.length + 1) })
  }
  if(type.col.length===2 && type.row.length===1){
    return Array.from({ length: List3.length + 1  })
  }
  if(type.col.length===2 && type.row.length===2){
    return Array.from({ length: List3.length * (List4.length + 1)  })
  }
  
}
// createArr.value =  createArrFun();


theMap.value = transData(data)
console.log(theMap.value, 'theMap.value', transData(data))

const getPath = (num1: number, num2: number, num3: number) => {
  const f1 = num1
  const f2 = num2
  const f3 = Math.ceil(num3 / (List4.length + 1))
  const f4 = num3 % (List4.length + 1) === 0 ? List4.length + 1 : num3 % (List4.length + 1)
  const flist = [f1, f2, f3, f4]
  return {
    // y1: num1,
    // y2: num2,
    // x1:Math.ceil(num3 / (List4.length + 1)),
    // x2: num3 % (List4.length + 1) === 0 ? List4.length + 1 : num3 % (List4.length + 1)
    obj: {
      f1,
      f2,
      f3,
      f4
    },
    path: flist.join(',')
  }
}
</script>

<template>
  <div>
    <table>
      <tr>
        <td :colspan="type.col.length" :rowspan="type.row.length">\</td>
        <td :colspan="type.row.length <= 1 ? 1 : List4.length + 1" v-for="(item, index) in List3">
          {{ item }}
        </td>
        <td :rowspan="type.row.length">总计da</td>
      </tr>
      <tr v-if="type.row.length>1">
        <template v-for="(itemD, indexD) in List3">
          <td v-for="(item, index) in List4">{{ item }}</td>
          <td>总计</td>
        </template>
      </tr>
      <template v-for="(itemW, indexW) in List1">
        <template v-if="type.col.length>1">
          <tr v-for="(item, index) in List2">
          <td v-if="index === 0" :rowspan="type.col.length>=1? List2.length + 1 : 1">{{ itemW }}</td>
          <td>{{ item }}</td>
          <!-- <td v-for="(itemA, indexA) in deptList">{{itemA}}</td> ${indexW+1}-${index+1}- -->
          <td v-for="(itemD, indexD) in createArrFun()">
            {{ theMap ? theMap[getPath(indexW + 1, index + 1, indexD + 1).path] : '' }}
          </td>
          <td>总（计算）</td>
        </tr>
        </template>

        <template v-else>
          <tr >
          <td >{{ itemW }}</td>
          <!-- <td v-for="(itemA, indexA) in deptList">{{itemA}}</td> ${indexW+1}-${index+1}- -->
          <td v-for="(itemD, indexD) in createArrFun()">
            1
            <!-- {{ theMap ? theMap[getPath(indexW + 1, index + 1, indexD + 1).path] : '' }} -->
          </td>
          <td>总（计算）</td>
        </tr>
        </template>

        <tr>
          <td>总计</td>
          <td v-for="(itemD, indexD) in createArrFun()">计算</td>
          <td>计算</td>
        </tr>
      </template>
    </table>

    <table>
      <tr>
        <td colspan="2" rowspan="2">1211</td>
        <td colspan="5">内容</td>
        <td rowspan="2">总计</td>
      </tr>
      <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
        <td>d</td>
        <td>总计</td>
      </tr>
      <tr>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>总计数量2</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
table {
  tr {
    border: 1px solid green;
    td {
      border: 1px solid red;
    }
  }
}
</style>
