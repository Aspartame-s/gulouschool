<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      :header-cell-style="{ background: '#E3F8F1' }"
      style="width: 100%"
      row-key="id"
      lazy
      stripe
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="selection" width="55" v-if="false">
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        width="auto"
        v-for="(item, index) in columnList"
        :key="index"
      >
      </el-table-column>
      <el-table-column label="" v-for="item in handleList" :key="item.handleName">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData, item.handleFlag)"
            type="text"
            size="small"
          >
           {{item.handleName}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: [],
    },
    columnList: {
      type: Array,
      default: [],
    },
    handleList: {
      type: Array,
      default: [],
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
    deleteRow(index, row) {
      console.log(row[index]);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.table-container {
  width: 100%;
  /deep/ .el-table td {
    //    border-bottom: none;
    text-align: center;
  }

  /deep/ .el-table th .cell {
    //    border-bottom: none;
    text-align: center;
  }

  /deep/ .el-table {
    border: 1px solid #e9eae9;
    border-bottom: none;
  }
  /deep/ .el-table__row {
    // width: 100%;
    //   border: 1px solid #e9eae9;
    border: 1px solid red;
  }
  /deep/ .el-button--text {
      color: #11B07A;
  }
}
</style>