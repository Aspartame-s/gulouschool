<template>
  <div class="tree-container">
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :default-expanded-keys="defaultShowNodes"
      node-key="id"
      :load="loadNode"
      ref="childtree"
      lazy
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- 父级icon -->
        <!-- <span
          v-if="data.children"
          class="iconfont icon-wenjian icon-father"
        ></span> -->
        <!-- 子级icon -->
        <span class="iconfont icon-wenjian icon-child"></span>
        <span v-if="!data.isInput">{{ node.label }}</span>
        <span v-else
          ><el-input
            v-model="currentInput"
            placeholder="请输入分类名称"
            @blur="saveCurrentInp"
          ></el-input
        ></span>
        <span class="iconfont icon-gengduo1" @click.stop>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" ref="echarType">
              <i class="iconfont icon-gengduo"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="appendNode(node, data)"
                >新增部门</el-dropdown-item
              >
              <el-dropdown-item @click.native="deleteNode(data)"
                >删除</el-dropdown-item
              >
              <el-dropdown-item @click.native="editNode(data)"
                >编辑</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
    expandedKey: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "isLeaf",
      },
      currentInput: "",
      defaultShowNodes: [],
    };
  },
  computed: {},
  watch: {
    data: {
      handler() {
        // 我这里默认展开一级, 指定几级就往里遍历几层取到 id 就可以了
        // this.data.forEach(item => {
        // 	this.defaultShowNodes.push(item.id)
        //   console.log(item)
        //   console.log(this.data)
        // })
        // console.log(this.defaultShowNodes)
        console.log(this.expandedKey);
        this.defaultShowNodes.push(this.expandedKey);
        this.defaultShowNodes = this.unique(this.defaultShowNodes);
        console.log(this.defaultShowNodes);
      },
      deep: true,
    },
  },
  methods: {
    unique(arr) {
      return Array.from(new Set(arr));
    },
    handleNodeClick(e, node) {
      console.log(node);
    },
    appendNode(node, data) {
      // console.log(data);
      // let nodeFn = this.$refs.childtree;
      this.$prompt("请输入部门名称", "新增", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "名称不能为空",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "新增成功",
          });
          this.$emit("appendNode", node, data, value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    deleteNode(data) {
      this.$emit("deleteNode", data);
    },
    editNode(data) {
      this.$prompt("请修改部门名称", "修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "名称不能为空",
        inputValue: data.name
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.$emit("editNode", data, value);

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    saveCurrentInp() {
      console.log(this.currentInput);
    },
    loadNode(node, resolve) {
      console.log(node);
      // if (node.level == 0) {
      //   this.$emit('loadFirstNode', resolve)
      //   // this.loadFirstNode(resolve);
      // }
      //如果展开其他级节点，动态从后台加载下一级节点列表
      if (node.level >= 1) {
        // this.loadChildNode(node, resolve);
        this.$emit("loadChildNode", node, resolve);
      }

      // setTimeout(() => {
      //   const data = [{
      //     name: 'leaf',
      //     leaf: true
      //   }, {
      //     name: 'zone'
      //   }];

      //   resolve(data);
      // }, 500);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.tree-container {
  width: 192px;
  .custom-tree-node {
    width: 192px;
    display: flex;
    align-items: center;
    position: relative;
    .icon-gengduo1 {
      position: absolute;
      right: 0;
      // align-self: flex-end;
    }
    // justify-content: space-between;
  }
  /deep/ .el-tree-node__content {
    font-size: 14px;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  /deep/ .el-tree-node {
    margin-bottom: 4px;
  }
}
.icon-wenjian {
  color: #11b07a;
  margin-right: 6px;
}
/deep/ .el-input__inner {
  height: 20px;
  width: 85%;
  padding: 0 2px;
}
</style>