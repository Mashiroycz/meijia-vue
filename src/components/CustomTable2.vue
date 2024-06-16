<script setup>
import { ref, reactive, watch, onMounted, onUpdated, nextTick } from 'vue'

const emit = defineEmits(['handleShowChange'])
const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  formData: {
    type: Object,
    default: null
  },
  isShowTable: {
    type: Boolean
  },
  fieldList: {
    type: Object
  },
  dictObj: {
    type: Object
  }
})
//

const theMap = ref(null)
const getList = ref({
  List1: [],
  List2: [],
  List3: [],
  List4: [],
  List1New: [],
  List3New: []
})
const createArr = ref([])
const type = ref({
  col: [1, 2],
  row: [1, 2]
})
const sumData = reactive({
  colSumList: [],
  rowSumList: [],
  sumNumber: 0
})
const createList = (data) => {
  const List1 = new Set()
  const List2 = new Set()
  const List3 = new Set()
  const List4 = new Set()

  data.forEach((item) => {
    // if (!item.field1) {
    //   List1.add("kong");
    // }
    if (item.field1) {
      List1.add(item.field1)
    }
    if (item.field2) {
      List2.add(item.field2)
    }
    if (item.field3) {
      List3.add(item.field3)
    }
    if (item.field4) {
      List4.add(item.field4)
    }
  })

  const findList = (key, list, type) => {
    const set = new Set()
    const obj = {}
    if (type === 'type1') {
      list.forEach((item) => {
        if (item.field1 === key) {
          set.add(item.field2)
        }
        // if (!item.field1) {
        //   set.add(item.field2);
        // }
      })
    }
    if (type === 'type2') {
      list.forEach((item) => {
        if (item.field3 === key) {
          set.add(item.field4)
        }
      })
    }

    return Array.from(set)
  }

  const List1New = Array.from(List1).map((item) => {
    let list2 = findList(item, data, 'type1')
    return {
      name: item,
      List2: list2
    }
  })

  const List3New = Array.from(List3).map((item) => {
    let list4 = findList(item, data, 'type2')
    return {
      name: item,
      List4: list4
    }
  })
  return {
    List1: Array.from(List1),
    List2: Array.from(List2),
    List3: Array.from(List3),
    List4: Array.from(List4),
    List1New,
    List3New
  }
}

const createArrFun = (getList, type) => {
  if (type.row.length === 1) {
    return Array.from({ length: getList.List3New.length })
  }
  if (type.row.length === 2) {
    // return Array.from({ length: List3.length * (List4.length + 1) });
    let list = []
    getList.List3New.forEach((item) => {
      item.List4.forEach((itemInner) => {
        list.push(itemInner)
      })
    })

    let length = list.length

    return Array.from({ length })
  }
}

// 翻译为字典label，补全数据
function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}
const getData4 = () => {
  return Array.from({ length: 300 }).map((item, index) => {
    return {
      field1: uuid(),
      field2: '2019',
      field3: uuid(),
      field4: 'x1',
      num: 2
    }
  })
}

// const data4 = [
// {
//     field1: "技术部",
//     field3: "a1",
//     num: 2,
//   },
//   {
//     field1: "开发部",
//     field3: "a1",
//     num: 1,
//   },
// ]
const data4 = [
  {
    field1: '技术部',
    field2: '2019',
    field3: 'a1',
    field4: 'x1',
    num: 2
  },
  {
    field1: '开发部',
    field2: '2019',
    field3: 'a1',
    field4: 'x2',
    num: 1
  },
  {
    field1: '技术部',
    field2: '2019',
    field3: 'a2',
    field4: 'x1',
    num: 1
  },
  {
    field1: '技术部',
    field2: '2018',
    field3: 'a1',
    field4: 'x1',
    num: 6
  },
  {
    field1: '技术部',
    field2: '2018',
    field3: 'a1',
    field4: 'x3',
    num: 10
  },
  {
    // field1: "技术部",
    field1: ' ',
    field2: '2018',
    field3: 'a1',
    field4: 'x1',
    num: 11
  },

  {
    // field1: "技术部",
    field1: ' ',
    field2: '2019',
    field3: 'a1',
    field4: 'x1',
    num: 8
  },

  {
    // field1: "技术部",
    field1: ' ',
    field2: '---',
    field3: 'a1',
    field4: ' ',
    num: 88
  }
]

const transDictData = (data, formData, fieldList, dictObj) => {
  const flist = []
  Object.keys(formData).forEach((key) => {
    if (formData[key]) {
      flist.push(key)
    }
  })

  const isHasDict = (key) => {
    return fieldList.find((item) => item.value === key)?.dictType
  }
  const getType = (key) => {
    return fieldList.find((item) => item.value === key)?.dictType
  }

  return data.map((obj) => {
    let o = { num: obj.num }
    flist.forEach((item) => {
      let theKey = formData[item] // 字段名称
      if (isHasDict(theKey) && obj[item]) {
        let type = getType(theKey)
        o[item] = dictObj[type].find((itemInner) => itemInner.value === obj[item])?.label
        // 如果是字典字段但找不到依然给他原来的值
        if (!o[item]) {
          o[item] = obj[item]
        }
      }
      if (!isHasDict(theKey) && obj[item]) {
        o[item] = obj[item]
      }
      if (!obj[item]) {
        o[item] = ' '
      }
    })
    return o
  })
}

//  纵1，横1  ； 纵1，纵2，横1  ； 纵1，横1，横2   ；纵1，纵2，横1，横2
let conutFuncNumber = 0
// const conutFuncNumber = ref(0);
const findListWithKey = (key, list, type) => {
  // conutFuncNumber.value +=1;

  if (type === 'type1') {
    if (list.find((i) => i.name === key)) {
      return list.find((i) => i.name === key).List2
    }
  }
  if (type === 'type2') {
    if (list.find((i) => i.name === key)) {
      return list.find((i) => i.name === key).List4
    }
  }
  return []
}

const findListWithKeyMap = (list, type) => {
  const map = new Map()
  if (type === 'type1') {
    list.forEach((item) => {
      map.set(item.name, item.List2)
    })
  }
  if (type === 'type2') {
    list.forEach((item) => {
      map.set(item.name, item.List4)
    })
  }
  return map
}

let up = 0

// 查找对应的list
const mapCol = ref()
const mapRow = ref()
onUpdated(() => {
  up += 1
  console.log(up, '更新次数')
  console.timeEnd('a2')
})

onMounted(() => {
  console.time('a2')
})

const transData = (data, getList) => {
  let obj = {}
  const findIndex = (list, value) => {
    let indexNum = undefined
    list.forEach((item, index) => {
      if (item === value) {
        indexNum = index + 1
      }
    })
    return indexNum
  }

  const map = new Map([[1, 0]])
  let sum = 0
  getList.List3New.forEach((item, index) => {
    sum = item.List4.length + sum
    map.set(index + 2, sum) // 1,4 2,8
  })

  data.forEach((item) => {
    let p3 = findIndex(getList.List3, item.field3)
    let p4 = findIndex(findListWithKey(item.field3, getList.List3New, 'type2'), item.field4)
    const list = [
      findIndex(getList.List1, item.field1),
      findIndex(findListWithKey(item.field1, getList.List1New, 'type1'), item.field2),
      map.get(p3) + p4
    ]
    obj[list.join(',')] = item.num
  })
  return obj
}

// createArr.value =  createArrFun();

const getPath = (num1, num2, num3) => {
  const field1 = num1
  const field2 = num2
  // [1,2,3,4,  5,6,7, 8,9]

  function findNumberPosition(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === target) {
          return {
            arrayIndex: i, // 数组索引
            elementIndex: j // 元素索引
          }
        }
      }
    }
  }

  let startNum = 0
  const arr = getList.value.List3New.map((item, index) => {
    let theArr = item.List4.map((itemInner, indexInner) => {
      return startNum + indexInner + 1
    })
    startNum = startNum + item.List4.length
    return theArr
  })

  let findres = findNumberPosition(arr, num3)

  const field3 = findres.arrayIndex + 1
  const field4 = findres.elementIndex + 1
  const flist = [field1, field2, field3, field4]
  return {
    obj: {
      field1,
      field2,
      field3,
      field4
    },
    path: flist.join(',')
  }
}

//
const getTableType = (form) => {
  if (form.field1 && form.field2 && form.field3 && form.field4) {
    return {
      col: [1, 2],
      row: [1, 2]
    }
  }
  if (
    (form.field1 && form.field2 && form.field3 && !form.field4) ||
    (form.field1 && form.field2 && !form.field3 && form.field4)
  ) {
    return {
      col: [1, 2],
      row: [1]
    }
  }
  if (
    (!form.field1 && form.field2 && form.field3 && form.field4) ||
    (form.field1 && !form.field2 && form.field3 && form.field4)
  ) {
    return {
      col: [1],
      row: [1, 2]
    }
  }
  if (form.field1 && !form.field2 && form.field3 && !form.field4) {
    return {
      col: [1],
      row: [1]
    }
  }
}

// 获取总计的列表
const getSumNumber = (data, formData) => {
  let keyList1 = []
  let keyList2 = []
  let colSumList
  let rowSumList
  let sumNumber
  // 1234 134 123 13

  Object.keys(formData).forEach((key) => {
    if (formData[key]) {
      keyList1.push(key)
    }
  })

  const getInverseArr = (name, arr) => {
    let index = arr.indexOf(name)
    return [...arr.slice(index), ...arr.slice(0, index)]
  }

  keyList2 = getInverseArr('field3', keyList1)

  const _deep = (mapArr) => {
    let sumNumber = 0
    let arr = [...mapArr].map((map, index) => {
      // map[index] 对于map的key,这里 map是数组[key,value]
      if (!(mapArr.get(map[0]) instanceof Map)) {
        sumNumber += Number(map[1])
        return {
          type: map[0],
          sum: Number(map[1])
        }
      }
      if (mapArr.get(map[0]) instanceof Map) {
        sumNumber += _deep(map[1]).sum
        return {
          type: map[0],
          sum: _deep(map[1]).sum,
          children: _deep(map[1]).arr
        }
      }
    })
    return {
      arr,
      sum: Number(sumNumber)
    }
  }

  const createTree2 = (data, keyList) => {
    const map = new Map()
    const setNestedValue = (currentMap, keys, index, value) => {
      if (index === keys.length - 1) {
        if (!currentMap.has(keys[index])) {
          currentMap.set(keys[index], value)
        }
        return
      }
      let nextMap = currentMap.get(keys[index])
      if (!nextMap) {
        nextMap = new Map()
        currentMap.set(keys[index], nextMap)
      }
      setNestedValue(nextMap, keys, index + 1, value)
    }
    data.forEach((item) => {
      const keys = keyList.map((key) => item[key])
      setNestedValue(map, keys, 0, item.num)
    })
    return map
  }

  let res1 = _deep(createTree2(data, keyList1)).arr
  sumNumber = _deep(createTree2(data, keyList1)).sum
  let res2 = _deep(createTree2(data, keyList2)).arr
  if (formData.field1 && !formData.field2) {
    colSumList = res1.map((item) => item.sum)
  }
  if (formData.field1 && formData.field2) {
    let arr = []
    res1.forEach((item) => {
      item.children.forEach((itemInner) => {
        arr.push(itemInner.sum)
      })
    })
    colSumList = arr
  }

  if (formData.field3 && !formData.field4) {
    rowSumList = res2.map((item) => item.sum)
  }
  if (formData.field3 && formData.field4) {
    let arr = []
    res2.forEach((item) => {
      item.children.forEach((itemInner) => {
        arr.push(itemInner.sum)
      })
    })
    rowSumList = arr
  }

  // console.log(
  //   colSumList,
  //   rowSumList,
  //   sumNumber,
  //   res1,
  //   res2,
  //   keyList1,
  //   keyList2,
  //   createTree2(data, keyList2)
  // );
  return {
    colSumList,
    rowSumList,
    sumNumber
  }
}

const getLengthIndex = (index, list) => {
  // let uid = uuid();
  // console.time(uid)
  // conutFuncNumber += 1;
  // console.log("findListWithKey执行次数", conutFuncNumber)
  let length = 0
  list.forEach((itemW, indexW) => {
    if (indexW < index) {
      length += mapCol.value.get(itemW.name).length
      // length += findListWithKey(itemW.name, list, "type1").length;
    }
  })
  return length
}

const isClick = ref(false)

const handleStart = () => {
  isClick.value = true
  console.time("start")
  // nextTick(()=>{
  //   isClick.value = true
  //   console.timeEnd("start")
  // })
}

const handleClear = () => {
  isClick.value = false
  // console.time("start")
  // nextTick(()=>{
  //   isClick.value = true
  //   console.timeEnd("start")
  // })
}
watch(isClick, (value) => {
  if (value) {
    // isClick.value = false
    const data4 = getData4();
    // 执行表格
    if (!!data4) {
      // const transDictData =
      // if (!props.formData.field1 || !props.formData.field3) {
      //   console.log("字段一和三必填");
      //   return;
      // }

      let transedDictData = transDictData(
        // props.data,
        data4,
        props.formData,
        props.fieldList,
        props.dictObj
      )

      let tempObj = getSumNumber(transedDictData, props.formData)
      sumData.rowSumList = tempObj.rowSumList
      sumData.colSumList = tempObj.colSumList
      sumData.sumNumber = tempObj.sumNumber

      type.value = getTableType(props.formData)
      getList.value = createList(transedDictData)

      mapCol.value = findListWithKeyMap(getList.value.List1New, 'type1')
      mapRow.value = findListWithKeyMap(getList.value.List3New, 'type2')

      theMap.value = transData(transedDictData, getList.value)
      createArr.value = createArrFun(getList.value, type.value)
    }

    // 更改状态
  }
})
</script>

<template>
  <div class="table-container">
    <el-button @click="handleStart">start</el-button>
    <el-button @click="handleClear">clear</el-button>
    <table v-if="isClick">
      <tr>
        <td class="table_th" :colspan="type.col.length" :rowspan="type.row.length">\</td>
        <template v-for="(item, index) in getList.List3New">
          <td
            class="table_th"
            :colspan="
              type.row.length <= 1 ? 1 : mapRow.get(item.name).length
              // : findListWithKey(item.name, getList.List3New, 'type2').length
            "
          >
            {{ item.name }}
          </td>
        </template>
        <td class="table_th" :rowspan="type.row.length">总计</td>
      </tr>
      <tr v-if="type.row.length > 1">
        <template v-for="(itemD, indexD) in getList.List3New">
          <td class="table_th" v-for="(item, index) in mapRow.get(itemD.name)">
            {{ item }}
          </td>
        </template>
      </tr>
      <template v-for="(itemW, indexW) in getList.List1New">
        <tr v-for="(item, index) in mapCol.get(itemW.name)">
          <td
            class="table_th"
            v-if="index === 0"
            :rowspan="
              type.col.length >= 1
                ? mapCol.get(itemW.name).length
                : // findListWithKey(itemW.name, getList.List1New, 'type1').length
                  1
            "
          >
            {{ itemW.name }}
          </td>
          <td class="table_th" v-if="type.col.length === 2">{{ item }}</td>

          <td v-for="(itemD, indexD) in createArr">
            <!-- {{ theMap[getPath(indexW + 1, index + 1, indexD + 1).path] }} -->
            {{ theMap[[indexW + 1, index + 1, indexD + 1].join(',')] }}
          </td>
          <td>
            {{ sumData.colSumList[getLengthIndex(indexW, getList.List1New) + index] }}
          </td>
        </tr>
      </template>
      <tr>
        <td class="table_th" :colspan="type.col.length">总计</td>
        <td v-for="(item, index) in sumData.rowSumList.concat([sumData.sumNumber])">
          {{ item }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  padding: 20px;
  min-height: 500px;
  overflow: scroll;
  table {
    border-collapse: collapse;
    border-spacing: 0;
    color: #606266;
    min-width: 1000px;
    tr {
      border: 1px solid #ebeef5;

      td {
        border: 1px solid #ebeef5;
        text-align: center;
        padding: 4px 4px;

        color: #909399;
        font-size: 16px;
        min-width: 40px;
      }
      td.table_th {
        color: #606266;
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
}
</style>
