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
      <div class="bread-crumb-container">
        <bread-crumb :data="breadCrumbList"></bread-crumb>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import myitem from "./myitem.vue";
import { recursiveFunction } from "../../utils/recursive";
export default {
  name: "Index",
  components: {
    menuItem: () => import("../../components/menuItem.vue"),
    breadCrumb: () => import("../../components/breadCrumb.vue"),
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
          path: "权限与日志",
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
          path: "API接入管理",
          children: [
            {
              name: "API接入审核",
              icon: "",
              path: "/api-audit",
              children: [],
            },
            {
              name: "API接入统计",
              icon: "",
              path: "/api-statistical",
              children: [],
            },
          ],
        },
        {
          name: "测试",
          icon: "iconfont icon-api-fill",
          path: "/test",
          children: [],
        },
      ],
      breadCrumbList: [],
    };
  },
  computed: {},
  watch: {
    $route(e) {
      // console.log(e);
      let arr = recursiveFunction(e.fullPath, this.menuList);
      this.breadCrumbList.push(arr[0].name);
    //   console.log(arr);
    },
  },
  methods: {
    menuSelect(index, indexPath) {
        // console.log(indexPath)
      this.breadCrumbList = [];
      this.breadCrumbList.push(indexPath[0]);
      this.activeIndex = index;
    },
  },
  created() {
    this.query = this.$route.query;
    // console.log(this.$route.path);
  },
  mounted() {
    // let arr = recursiveFunction("/education-department", this.menuList);
    // console.log(arr);
  },
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
    padding: 68px 36px 24px;
    flex: 1;
    background-color: #fff;
    border-radius: 24px 0 0 24px;
    box-shadow: -2px 0 8px 0 rgba(0, 0, 0, 0.15);
    .bread-crumb-container {
      width: 100%;
      height: 73px;
      background-color: #fafafa;
    }
  }
}
</style>