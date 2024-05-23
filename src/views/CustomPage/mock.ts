const getCustomList = (callback: Function) => {
  setTimeout(() => {
    const res = {
      data: [{
        customerId: 1,
        name: "alex",
        birthYear: 1998,
        otherName: "昵称1",
        phone: ["14799281923","13323214321"],
        vxNumber: ["vx_1"],
        createDate: "2024-3-14",
        address: "安庆xx小区",
        occupation: "职业",
        description: "健康状态",
        height: "171",
        weight: "60kg",
        remarks: "其他备注信息"
      },
      {
        customerId: 2,
        birthYear: 1998,
        name: "alex2",
        otherName: "昵称2222",
        phone: ["14799281923"],
        vxNumber: ["vx_1"],
        createDate: "2024-3-14",
        address: "安庆xx小区",
        occupation: "职业",
        description: "健康状态",
        height: "171",
        weight: "60kg",
        remarks: "其他备注信息"
      },
      {
        customerId: 3,
        birthYear: 1998,
        name: "alex",
        otherName: "昵称4",
        phone: ["14799281923"],
        vxNumber: ["vx_1"],
        createDate: "2024-3-14",
        address: "安庆xx小区",
        occupation: "职业",
        description: "健康状态",
        height: "171",
        weight: "60kg",
        remarks: "其他备注信息"
      },
      {
        customerId: 4,
        birthYear: 1998,
        otherName: "昵称7",
        name: "alex",
        phone: ["14799281923"],
        vxNumber: ["vx_1"],
        createDate: "2024-3-14",
        address: "安庆xx小区",
        occupation: "职业",
        description: "健康状态",
        height: "171",
        weight: "60kg",
        remarks: "其他备注信息"
      },
      {
        customerId: 5,
        birthYear: 1998,
        otherName: "昵称grg",
        name: "alex",
        phone: ["14799281923"],
        vxNumber: ["vx_1"],
        createDate: "2024-3-14",
        address: "安庆xx小区",
        occupation: "职业",
        description: "健康状态",
        height: "171",
        weight: "60kg",
        remarks: "其他备注信息"
      },
      {
        customerId: 6,
        birthYear: 1999,
        otherName: "昵称1",
        name: "alex",
        phone: ["14799281923"],
        vxNumber: ["vx_1"],
        createDate: "2024-3-14",
        address: "安庆xx小区",
        occupation: "职业",
        description: "健康状态",
        height: "171",
        weight: "60kg",
        remarks: "其他备注信息"
      },
      {
        customerId:7,
        birthYear: 1228,
        otherName: "昵称1",
        name: "alex",
        phone: ["14799281923"],
        vxNumber: ["vx_1"],
        createDate: "2024-3-14",
        address: "安庆xx小区",
        occupation: "职业",
        description: "健康状态",
        height: "171",
        weight: "60kg",
        remarks: "其他备注信息"
      }
    ],
      status: 1
    }
    callback(res)
  }, 200)
}


export {getCustomList};
