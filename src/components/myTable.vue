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
      ref="myTable"
      @select="select"
      @select-all="selectAll"
      id="table"
    >
      <el-table-column type="selection" width="55" v-if="hasSelect">
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
      <template slot-scope="scope">
        <div v-if="item.prop == 'yingyongname'" class="hasIcon">
          <img :src="scope.row.icon" alt="" class="column-icon">
          {{scope.row[item.prop]}}
        </div>
        <span v-else-if="item.prop == 'statu'" :style="{'color': scope.row[item.prop] == '待审核' ? '#4D9EFF' : scope.row[item.prop] == '已通过' ? '#11B07A' : '#FF7B7B'}">{{scope.row[item.prop]}}</span>
        <span v-else>{{scope.row[item.prop]}}</span>
      </template>
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
      default: () => {
        return [];
      },
    },
    hasSelect: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      checkIndeRow: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    load(tree, treeNode, resolve) {
      // console.log(tree);
      // console.log(treeNode);
      const pid = tree.id;
      getEduUnitList("", pid).then((res) => {
        res.data.forEach((item) => {
          this.$set(item, "type", 1);
        });
        resolve(res.data);
        console.log(res);
      });
    },
    handleRow(index, row, flag) {
      this.$emit("handleRow", index, row, flag);
    },

    //单选
    select(selection, row) {
      // console.log(selection)
      console.log(row)
      this.$emit('selectSingle', row)
    },

    //全选
    selectAll(selection) {
      // console.log(selection)
      this.$emit('selectAll', selection)
    }
    //全选
    // tableSelectAll() {
    //   //清空半选数组，此数组请提前在data中定义
    //   this.checkIndeRow = [];
    //   //获得子数据对象
    //   let children = this.$refs.myTable.store.states.lazyTreeNodeMap;
    //   //已选数组
    //   let select = this.$refs.myTable.store.states.selection;
    //   //全选状态
    //   let isAllSelect = this.$refs.myTable.store.states.isAllSelected;
    //   if (isAllSelect) {
    //     for (let item in children) {
    //       children[item].forEach((d, i) => {
    //         if (select.indexOf(d) == -1) {
    //           select.push(d);
    //         }
    //       });
    //     }
    //   } else {
    //     this.$refs.myTable.store.states.selection = [];
    //   }
    // },
    // //控制父级的全选和半选
    // tableSelect(selection, row) {
    //   let states = this.$refs.myTable.store.states;
    //   let children = states.lazyTreeNodeMap[row.id];
    //   let select = states.selection;
    //   //如果被点击的是标题行
    //   //因为表中存在标题行，所以设置一个type参数，0为标题行
    //   if (row.type == 0) {
    //     // 如果半选数组中有被点击行，则半选状态肯定被取消
    //     let keyIndeRow = this.checkIndeRow.indexOf(row);
    //     if (keyIndeRow >= 0) {
    //       this.checkIndeRow.splice(keyIndeRow, 1);
    //     }
    //     if (row.hasChildren) {
    //       //如果选择数组中没有此行数据，则将其子数据都加入选择数组
    //       if (selection.indexOf(row) >= 0) {
    //         for (let item in children) {
    //           if (select.indexOf(children[item]) == -1) {
    //             select.push(children[item]);
    //           }
    //         }
    //       } else {
    //         //如果选择数组中已有此行数据，则将其子数据都移出选择数组
    //         for (let item in children) {
    //           let key = select.indexOf(children[item]);
    //           if (key >= 0) {
    //             select.splice(key, 1);
    //             let child = states.lazyTreeNodeMap[children[item].id];
    //           }
    //         }
    //       }
    //     }
    //   }
    //   //如果被点击的是子行
    //   if (row.type == 1) {
    //     //找到此子条目的父条目
    //     let parentId = "";
    //     for (let id in states.lazyTreeNodeMap) {
    //       states.lazyTreeNodeMap[id].forEach((d, i) => {
    //         if (d == row) {
    //           parentId = id;
    //         }
    //       });
    //     }
    //     let sum = 0;
    //     //计算子数据行有多少已经被选中
    //     states.lazyTreeNodeMap[parentId].forEach((d, i) => {
    //       if (selection.indexOf(d) >= 0) {
    //         sum++;
    //       }
    //     });
    //     //得到父行数据对象
    //     let parentObj = states.data.filter((d, i, arr) => {
    //       return d.id == parentId;
    //     });
    //     let parentNode = parentObj[0];
    //     // 如果已选条目中已经有了所有子条目，则目录应被选中
    //     if (sum === states.lazyTreeNodeMap[parentId].length) {
    //       if (select.indexOf(parentNode) == -1) {
    //         select.push(parentNode);
    //       }
    //       let key = this.checkIndeRow.indexOf(parentNode);
    //       if (key >= 0) {
    //         this.checkIndeRow.splice(key, 1);
    //       }
    //     } else if (sum > 0) {
    //       // 如果只有部分子条目，则目录应被半选
    //       // 从selection中删除，用来改变全选按钮的状态为半选
    //       let key = select.indexOf(parentNode);
    //       if (key >= 0) {
    //         select.splice(key, 1);
    //       }
    //       this.checkIndeRow.push(parentNode);
    //     } else {
    //       // 如果没有子条目，则目录应不选
    //       let key = select.indexOf(parentNode);
    //       if (key >= 0) {
    //         select.splice(key, 1);
    //       }
    //       let keyIndeRow = this.checkIndeRow.indexOf(parentNode);
    //       if (keyIndeRow >= 0) {
    //         this.checkIndeRow.splice(keyIndeRow, 1);
    //       }
    //     }
    //   }
    // },
    // setTableClass({ row, column, rowIndex, columnIndex }) {
    //   if (
    //     this.checkIndeRow.length > 0 &&
    //     this.checkIndeRow.indexOf(row) >= 0 &&
    //     columnIndex == 0
    //   ) {
    //     return "el-checkbox__input is-indeterminate";
    //   }
    // },
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
/deep/ .el-checkbox__input {
  display: revert!important;
}
/deep/ .el-table .cell {
  overflow: visible;
}
.hasIcon {
  display: flex;
  justify-content: center;
  .hasIcon-span {
    font-size: 14px;
    color: #666;
  }
}
.column-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
</style>