<template>
  <div class="container">
    <div class="menu-container">
      <img src="../../assets/img/绿色2 1.png" alt="" class="menu-icon" />
      <div class="product-name">鼓楼e学校数据平台</div>
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          background-color="transparent"
          active-text-color="#00D88A"
          class="el-menu-vertical-demo"
          @select="menuSelect"
          router
        >
          <menu-item :data="menuList"></menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content-container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import myitem from "./myitem.vue";
export default {
  name: "Index",
  components: {
    menuItem: () => import("../../components/menuItem.vue"),
  },
  data() {
    return {
      query: null,
      activeIndex: this.$route.path,
      menuList: [
        {
          name: "通讯录管理",
          icon: "iconfont icon-tongxunlutianchong",
          path: "通讯录管理",
          children: [
            {
              name: "教育主管部门",
              icon: "",
              path: "/education-department",
              children: [],
            },
            {
              name: "学校",
              icon: "",
              path: "/school",
              children: [],
            },
          ],
        },
        {
          name: "权限与日志",
          icon: "iconfont icon-quanxian",
          path: "权限",
          children: [
            {
              name: "权限管理",
              icon: "",
              path: "/permissions-management",
              children: [],
            },
            {
              name: "维护日志",
              icon: "",
              path: "/maintenance-note",
              children: [],
            },
          ],
        },
        {
          name: "API接入管理",
          icon: "iconfont icon-api-fill",
          path: "/api-management",
          children: []
        },
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    menuSelect(index) {
        console.log(index)
      this.activeIndex = index;
    },
  },
  created() {
    this.query = this.$route.query;
    // console.log(this.$route.query);
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.container {
  display: flex;
  .menu-container {
    width: 228px;
    height: auto;
    min-height: 100vh;
    // background-color: pink;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 24px;
    .menu-icon {
      width: 40px;
      height: 33px;
      margin-bottom: 12px;
    }
    .product-name {
      font-size: 18px;
      color: #00d88a;
      font-weight: 500;
      margin-bottom: 36px;
    }
    .menu {
      width: 100%;
      flex-grow: 1;
    //   background-color: pink;
    }
  }
  .content-container {
    flex: 1;
    background-color: #fff;
    border-radius: 24px 0 0 24px;
    box-shadow: -2px 0 8px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>