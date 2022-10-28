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
        <template slot="title" style="padding-left: 56rpx !important">
          <i :class="item.icon ? item.icon : 'iconfont icon-zhanweifu'"></i>
          <span>{{ item.name }}</span>
        </template>
        <menu-item :data="item.children"></menu-item>
      </el-submenu>
      <!-- 情况二：没子集的情况： -->
      <el-menu-item :key="index" v-else :index="item.path">
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
    //   selectMenuItem(item) {
    //       console.log(item)
    //   }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
/deep/ .el-menu-item {
  min-width: 100%;
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
    background-color: transparent !important;
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
    background-color: transparent !important;
  }
}
/deep/ .is-active {
  .iconfont {
    color: #11b07a;
    // color: transparent;
  }
  .el-submenu__title {
    color: #11b07a;
    font-weight: 500;
  }
  .el-menu-item {
    &.is-active {
        background-color: #F0F6F4!important;
      position: relative;
    //   &::before {
    //     content: "";
    //     position: absolute;
    //     width: 20px;
    //     height: 20px;
    //     right: 0;
    //     top: -20px;
    //     background: #F0F6F4;
    //     // border-radius: 50%;
    //     background: radial-gradient(
    //       circle at 0 0,
    //       transparent 20px,
    //       #F0F6F4 21px
    //     );
    //   }
    //   &::after {
    //     content: "";
    //     position: absolute;
    //     width: 20px;
    //     height: 20px;
    //     right: 0;
    //     bottom: -20px;
    //     background: #F0F6F4;
    //     // border-radius: 50%;
    //     background: radial-gradient(
    //       circle at 0 100%,
    //       transparent 20px,
    //       #F0F6F4 21px
    //     );
    //   }
      //   background-color: rgba(0, 216, 138, 0.15) !important;
    }
  }
}
</style>