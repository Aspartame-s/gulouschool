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
        <template slot="title" style="padding-left: 56rpx!important">
          <i :class="item.icon ? item.icon : 'iconfont icon-zhanweifu'"></i>
          <span>{{ item.name }}</span>
        </template>
        <menu-item :data="item.children"></menu-item>
      </el-submenu>
      <!-- 情况二：没子集的情况： -->
      <el-menu-item :key="index" v-else :index="item.path" @click="selectMenuItem(item)">
        <i :class="item.icon ? item.icon : 'iconfont icon-zhanweifu'"></i>
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
  methods: {
      selectMenuItem(item) {
          console.log(item)
      }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
/deep/ .el-menu-item {
  height: 30px;
  line-height: 30px;
  margin-bottom: 12px;
  font-size: 16px;
  padding-left: 24px !important;
  padding-right: 0 !important;
  text-align: left;
  color: #999999;
  .iconfont {
    margin-right: 12px;
    font-size: 18px;
  }
  &:hover {
    background-color: rgba(0, 216, 138, 0.15) !important;
  }
}
/deep/ .el-submenu {
  .el-submenu__title {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 12px;
    padding-left: 24px !important;
    padding-right: 0 !important;
    text-align: left;
    color: #999999;
    span {
      height: 30px;
      line-height: 30px;
      display: inline-block;
    }
    .iconfont {
      margin-right: 12px;
      font-size: 18px;
    }
  }
  //    .el-submenu{
  //     font-size: 16px;
  //     // height: 26px;
  //     margin-bottom: 12px;
  //     text-align: left;
  //     padding-left: 56px !important;
  //     padding-right: 0;
  //   }
  .el-submenu__title:hover {
    background-color: rgba(0, 216, 138, 0.15) !important;
  }
}
/deep/ .is-active {
  .iconfont {
    color: #00d88a;
    // color: transparent;
  }
  .el-submenu__title {
    color: #00d88a;
  }
  .el-menu-item {
    &.is-active {
      background-color: rgba(0, 216, 138, 0.15) !important;
    }
  }
}
</style>