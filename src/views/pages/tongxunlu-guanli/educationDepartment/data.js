export const formHeader = [
    {
      itemType: "text", // 输入框类型
      labelName: "姓名", // 输入框名字
      propName: "name", // 输入框字段名
      isRequired: false, // 是否必填
      readonly: true,
      placeholder: "请填写名字", // 输入框placeholder提示语加上，可用于告知用户规则
    },
    {
      itemType: "number",
      labelName: "年龄",
      propName: "age",
      isRequired: true,
      readonly: true,
      //   unit: "year", // 数字类型的要有单位
      placeholder: "请输入年龄",
    },
    {
        itemType: "number",
        labelName: "年龄",
        propName: "age",
        isRequired: true,
        readonly: true,
        //   unit: "year", // 数字类型的要有单位
        placeholder: "请输入年龄",
      },
  ]

  export const tableData1 = [
    //table值
    {
      id: 1,
      unitName: "鼓楼教育局",
      contact: "王小虎",
      contactPhone: "13344446666",
      email: "327137384@qq.com",
    },
    {
      id: 2,
      unitName: "鼓楼教育局",
      contact: "王小虎",
      contactPhone: "13344446666",
      email: "327137384@qq.com",
    },
    {
      id: 3,
      unitName: "鼓楼教育局",
      contact: "王小虎",
      contactPhone: "13344446666",
      email: "327137384@qq.com",
    },
    {
      id: 4,
      unitName: "鼓楼教育局",
      contact: "王小虎",
      contactPhone: "13344446666",
      email: "327137384@qq.com",
    },
  ]

  export const columnList = [
    //表头数据
    {
      prop: "unitName",
      label: "单位名称",
    },
    {
      prop: "contact",
      label: "联系人",
    },
    {
      prop: "contactPhone",
      label: "联系人电话",
    },
    {
      prop: "email",
      label: "邮箱",
    },
  ]

  export const handleList = [
    //操作栏数据
    {
      handleName: "查看单位信息",
      handleFlag: 1,
    },
    {
      handleName: "查看通讯录",
      handleFlag: 2,
    },
    {
      handleName: "编辑",
      handleFlag: 3,
    },
  ]