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
      :tree-props="{ hasChildren: 'hasSons' }"
    >
      <el-table-column type="selection" width="55" v-if="false">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        :prop="item.prop"
        :label="item.label"
        width="auto"
        min-width="120%"
        v-for="(item, index) in columnList"
        :key="index"
      >
      </el-table-column>
      <el-table-column
        label=""
        v-for="item in handleList"
        :key="item.handleName"
         width="auto"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="
              handleRow(scope.$index, scope.row, item.handleFlag)
            "
            type="text"
            size="small"
          >
            {{ item.handleName }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getEduUnitList } from "@/api/education";

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
      // console.log(tree);
      // console.log(treeNode);
      const pid = tree.id
       getEduUnitList('', pid).then(res => {
        resolve(res.data)
        console.log(res)
      })
      // setTimeout(() => {
      //   resolve([
      //     {
      //       id: 31,
      //       date: "2016-05-01",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1519 弄",
      //     },
      //     {
      //       id: 32,
      //       date: "2016-05-01",
      //       name: "王小虎",
      //       address: "上海市普陀区金沙江路 1519 弄",
      //     },
      //   ]);
      // }, 1000);
    },
    handleRow(index, row, flag) {
      // console.log(index);
      // console.log(row);
      // console.log(flag);
      // if(flag == 2) {

      // }
      this.$emit('handleRow', index, row, flag)
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
    color: #11b07a;
  }
}
</style>