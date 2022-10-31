<template>
  <div class="item-container">
    <div>
      <div class="handle-btn-container">
        <div class="add-unit yellow-btn">新建单位</div>
        <div class="freeze-unit yellow-btn">冻结单位</div>
      </div>
      <my-table
        :tableData="tableData1"
        :columnList="columnList"
        :handleList="handleList"
      ></my-table>
    </div>
  </div>
</template>

<script>
import myTable from "../../../../components/myTable.vue";
export default {
  components: {
    myTable,
  },
  data() {
    return {
      tableData1: [
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
      ],
      columnList: [
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
      ],
      handleList: [
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
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>