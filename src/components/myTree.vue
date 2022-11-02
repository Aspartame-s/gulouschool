<template>
  <div class="tree-container">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- 父级icon -->
        <span
          v-if="data.children"
          class="iconfont icon-wenjian icon-father"
        ></span>
        <!-- 子级icon -->
        <span v-else class="iconfont icon-wenjian icon-child"></span>
        <span style="margin-right: ">{{ node.label }}</span>
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
  components: {},
  data() {
    return {
      data: [
        {
          label: "一级 1",
          id: 1,
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
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
  }
}
.icon-wenjian {
  color: #11b07a;
  margin-right: 6px;
}
</style>