<template>
  <div>
    <template v-for="(item, index) in data">
      <!-- 因为有子集和无子集渲染html标签不一样，所以要分为两种情况
           情况一：有子集的情况：-->
      <el-submenu
        :key="index"
        :index="item.path"
        v-if="item.children.length > 0"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <menu-item :data="item.children"></menu-item>
      </el-submenu>
      <!-- 情况二：没子集的情况： -->
      <el-menu-item :key="index" v-else :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    data: {
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
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
/deep/ .el-submenu {
  .el-submenu__title:hover {
    background-color: rgba(0, 216, 138, 0.15) !important;
  }
  .el-menu-item:hover {
    background-color: rgba(0, 216, 138, 0.15) !important;
  }
}
/deep/ .is-active {
  .iconfont {
    color: #00d88a;
  }
  .el-submenu__title {
    color: #00d88a;
  }
  .is-active {
    background-color: rgba(0, 216, 138, 0.15) !important;
  }
}
</style>