<script setup lang="ts">
import { ref, reactive } from 'vue'


let obj = {
  技术部: {
    a1: {
      x1: {}
    },
    a2: {
      x1: {}
    },
    num: 3
  },
  开发部: {
    a2: {
      x3: {}
    },
    num: 4
  },
  type: '总计',
  num: 8
}



// 由源数据，生成list
// list1 = ['技术部',"开发部"," "，"总计"]

// 由源数据和由list生成树结构
// [{ text: '技术部',children: [ { text: '2018' },{ text: '2019' } ] }]

// 3个参数生成map树，2个生成集合
const createTree = (data: any, key1: any, key2?: any) => {
  let tree: any = undefined
  if (key2) {
    tree = new Map()
    data.forEach((item: any) => {
      tree.get(item[key1])
        ? tree.set(item[key1], tree.get(item[key1]).add(item[key2]))
        : tree.set(item[key1], new Set([item[key2]]))
    })
  }
  if (!key2) {
    tree = new Set()
    data.forEach((item: any) => {
      tree.add(item[key1])
    })
  }
  return tree
}
// const createTree2 = (data: any, keyList: any) => {
//   const map = new Map()

//   const Circle: any = (key: any, count: number, item: any) => {
//     const map = new Map()
//     if (count === keyList.length - 1) {
//       return map.set(key, undefined)
//     }
//     return map.set(key, Circle(item[keyList[count + 1]], count + 1, item))
//   }
//   let countStart = 0
//   data.forEach((item: any) => {
//     map.set(item[keyList[countStart]], Circle(item[keyList[countStart + 1]], countStart, item))
//   })
//   return map
// }
const data = [
  {
    field1: '技术部',
    field2: '2018',
    field3: 'a1',
    field4: 'x1',
    num: 2
  },
  {
    field1: '开发部',
    field2: '2018',
    field3: 'a2',
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
    field2: '2019',
    field3: 'a1',
    field4: 'x2',
    num: 6
  }
]

const keyList = ['field1', 'field2', 'field3', 'field4']

const createTree2 = (data: any, keyList: any) => {  
  const map = new Map();  
  const setNestedValue = (currentMap: any, keys: any, index: any, value: any) => {  
    if (index === keys.length - 1) {  
      if (!currentMap.has(keys[index])) {  
        currentMap.set(keys[index], value);  
      }  
      return;  
    }  
    let nextMap = currentMap.get(keys[index]);  
    if (!nextMap) {  
      nextMap = new Map();  
      currentMap.set(keys[index], nextMap);  
    }  
    setNestedValue(nextMap, keys, index + 1, value);  
  };  
  data.forEach((item: any) => {  
    const keys = keyList.map((key: any) => item[key]);  
    setNestedValue(map, keys, 0, item.num); 
  });  
  return map;  
};
// console.log(createTree2(data, keyList), 'themap')

const map2 = createTree2(data, keyList);
// map2.


// function mapToMapNestedStructure(map) {  
//   let children = [];  
//   let totalNum = 0;  
  
//   map.forEach((value, key) => {  
//     if (value instanceof Map) {  
//       const nestedStructure = mapToMapNestedStructure(value);  
//       children.push({  
//         ...nestedStructure,  
//         num: nestedStructure.num  
//       });  
//       totalNum += nestedStructure.num;  
//     } else {  
//       // 假设map的叶子节点是num的累加值  
//       totalNum += value;  
//     }  
//   });  
  
//   return {  
//     children,  
//     num: totalNum  
//   };  
// }  
  
// function mapToDesiredStructure(map) {  
//   const nestedStructure = mapToMapNestedStructure(map);  
//   // 由于我们的mapToNestedStructure函数会为每个层级都生成num，  
//   // 我们需要删除非最外层的num（即children数组中对象的num），  
//   // 因为我们只需要在最外层保留num作为总和。  
//   nestedStructure.children.forEach(child => delete child.num);  
//   return {  
//     children: nestedStructure.children,  
//     num: nestedStructure.num  
//   };  
// }  
  
// const nestedStructure = mapToDesiredStructure(map2);  
// console.log(nestedStructure, "xs");

// const map1 = createTree(data, 'field1', 'field2')

// map1.forEach((item: any, key: any) => {
//   item.forEach((itemI: any, key2: any) => {
//     console.log(item, itemI, key, key2)
//   })
// })
const listData = [
  {
    path: '技术部,2018,a1,x1',
    value: 6
  },
  {
    path: '技术部, ,a1,x1',
    value: 0
  },
  {
    path: '总计, a1,x1',
    value: 0
  }
]

const columns1 = [
  {
    title: '姓名',
    dataIndex: 'name',
    colSpan: 2,
    key: 'name',
    childrenColumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        colSpan: 2,
        key: 'name'
      }
    ]
  }
]

const columns2 = [
  {
    title: '姓名',
    dataIndex: 'name',
    colSpan: 2,
    key: 'name',
    childrenColumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        colSpan: 2,
        key: 'name'
      }
    ]
  }
]

const dataList = [
  {
    title: '姓名',
    dataIndex: 'name',
    colSpan: 2,
    key: 'name',
    childrenColumns: [
      {
        title: '姓名',
        dataIndex: 'name',
        colSpan: 2,
        key: 'name'
      }
    ]
  }
]

const dataList2 = [
  {
    title: '姓名',
    dataIndex: 'name',
    colSpan: 2,
    key: 'name',
    children: [
      {
        title: '姓名',
        dataIndex: 'name',
        colSpan: 2,
        key: 'name'
      }
    ]
  }
]
</script>

<template>
  <div>
    <!-- datalist.forEach(()
      col
    ) -->
  </div>
</template>

<style scoped></style>
