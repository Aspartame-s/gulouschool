<template>
  <div class="tree-container">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false" :load="loadNode" lazy>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- 父级icon -->
        <span
          v-if="data.children"
          class="iconfont icon-wenjian icon-father"
        ></span>
        <!-- 子级icon -->
        <span v-else class="iconfont icon-wenjian icon-child"></span>
        <span>{{ node.label }}</span>
        <span class="iconfont icon-gengduo1" @click.stop>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" ref="echarType">
              <i class="iconfont icon-gengduo"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="seeTable(node)">详情</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
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
      default: []
    }
  },
  components: {},
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: 'isLeaf'
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleNodeClick(e) {
      console.log(e);
    },
    seeTable(node) {
        console.log(node)
    },
     loadNode(node, resolve) {
       console.log(node)
      // if (node.level == 0) {
      //   this.$emit('loadFirstNode', resolve)
      //   // this.loadFirstNode(resolve);
      // }
      //如果展开其他级节点，动态从后台加载下一级节点列表
      if (node.level >= 1) {
        // this.loadChildNode(node, resolve);
         this.$emit('loadChildNode', node, resolve)
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
      }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.tree-container {
  width: 192px;
  .custom-tree-node {
    width: 100%;
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
</style>