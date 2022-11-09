export const formHeader = [ //form 表头数据
    {
      itemType: "text", // 输入框类型
      labelName: "单位名称", // 输入框名字
      propName: "name", // 输入框字段名
      isRequired: true, // 是否必填
      readonly: true,
      placeholder: "请输入", // 输入框placeholder提示语加上，可用于告知用户规则
    },
    {
        itemType: "number",
        labelName: "统一社会信用码",
        propName: "unifiedSocialCreditCode",
        isRequired: true,
        readonly: true,
        placeholder: "请输入",
      },
      {
        itemType: "text",
        labelName: "联系人",
        propName: "contact",
        isRequired: true,
        readonly: true,
        placeholder: "请输入",
      },
      {
        itemType: "number",
        labelName: "联系人手机",
        propName: "contactPhone",
        isRequired: true,
        readonly: true,
        placeholder: "请输入手机号",
      },
      {
        itemType: "number",
        labelName: "固定电话",
        propName: "fixedPhone",
        isRequired: true,
        readonly: true,
        placeholder: "请输入固定电话",
      },
      {
        itemType: "text",
        labelName: "单位地址",
        propName: "address",
        isRequired: true,
        readonly: true,
        placeholder: "请输入",
      },
      {
        itemType: "text",
        labelName: "单位邮箱",
        propName: "email",
        isRequired: true,
        readonly: true,
        placeholder: "请输入",
      },
      // {
      //   itemType: "selectTwo", // 下拉框类型二，枚举值单选，在点击下拉选项时根据枚举id发请求，获取枚举值
      //   labelName: "上级单位",
      //   propName: "pid",
      //   isRequired: true,
      //   placeholder: "请选择",
      //   readonly: true,
      //   id: "456456456",
      // },
      {
        itemType: "search", // 下拉框类型二，枚举值单选，在点击下拉选项时根据枚举id发请求，获取枚举值
        labelName: "上级单位",
        propName: "parentName",
        isRequired: true,
        placeholder: "请输入上级单位",
        readonly: true
      },
  ]

  export const tableData1 = [ //table值
    {
      id: 1,
      unitName: "鼓楼教育局",
      contact: "王小虎",
      contactPhone: "13344446666",
      email: "327137384@qq.com",
      has: true
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

  export const columnList = [ //表头数据
    {
      prop: "name",
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

  export const employeeColumnList = [
    {
      prop: 'employeeName',
      label: '姓名',
    },
    {
      prop: 'position',
      label: '职务',
    },
    {
      prop: 'dept',
      label: '部门',
    },
    {
      prop: 'phone',
      label: '手机号',
    },
    {
      prop: 'email',
      label: '邮箱',
    }
  ]

  export const handleList = [ //操作栏数据
    {
      handleName: "查看单位信息",
      handleFlag: 1,
    },
    {
      handleName: "查看通讯录",
      handleFlag: 2,
    },
    {
      handleName: "冻结",
      handleFlag: 3,
    },
  ]

  export const employeeHandleList = [ //员工操作栏数据
    {
      handleName: "编辑",
      handleFlag: 4,
    },
    {
      handleName: "删除",
      handleFlag: 5,
    }
  ]