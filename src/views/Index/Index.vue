<template>
  <div class="container">
    <div class="menu-container">
      <img src="../../assets/img/Group 25.png" alt="" class="menu-icon" />
      <div class="product-name">鼓楼e学校数据平台</div>
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          background-color="transparent"
          active-text-color="#11B07A"
          class="el-menu-vertical-demo"
          @select="menuSelect"
          router
        >
          <menu-item :data="menuList"></menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content-container">
      <div class="message-container">
        <div class="avatar"></div>
        <span class="name">夏老师</span>
        <img src="../../assets/img/tip.png" alt="" class="tip-icon" />
        <span class="message">您好！您当前有新的事物要处理。</span>
      </div>
      <div class="bread-crumb-container">
        <bread-crumb :data="breadCrumbList" style="margin-bottom: 6px"></bread-crumb>
        <div class="current-breadcrumb">{{breadCrumb}}</div>
        <div class="current-line"></div>
      </div>
      <router-view style="flex-grow: 1"></router-view>
    </div>
  </div>
</template>

<script>
// import myitem from "./myitem.vue";
// import { recursiveFunction } from "../../utils/recursive";
import { mapState } from 'vuex';
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
              path: "/address-management/education-department",
              children: [],
            },
            {
              name: "学校",
              icon: "",
              path: "/address-management/school",
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
              path: "/permissions/permissions-management",
              children: [],
            },
            {
              name: "维护日志",
              icon: "",
              path: "/permissions/maintenance-note",
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
              path: "/api/api-audit",
              children: [],
            },
            {
              name: "API接入统计",
              icon: "",
              path: "/api/api-statistical",
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
  computed: {
    ...mapState(['breadCrumb']),
  },
  watch: {
    $route(e) {
      let matchedArr = e.matched;
      matchedArr.shift();
      this.breadCrumbList = matchedArr;
      //   console.log(this)
      //   let arr = recursiveFunction(e.fullPath, this.menuList);
      //   this.breadCrumbList.push(arr[0].name);
      //   console.log(arr);
    },
  },
  methods: {
    menuSelect(index, indexPath) {
      // console.log(indexPath)
      //   this.breadCrumbList = [];
      //   this.breadCrumbList.push(indexPath[0]);
      this.activeIndex = index;
    },
  },
  created() {
    this.query = this.$route.query;
    let matchedArr = this.$route.matched;
    matchedArr.shift();
    this.breadCrumbList = matchedArr;
  },
  mounted() {
    console.log(this.breadCrumb)
    // let arr = recursiveFunction("/education-department", this.menuList);
    // console.log(arr);
  },
};
</script>
<style lang='scss' scoped>
.container {
  display: flex;
  background-color: #f0f6f4;
  .menu-container {
    width: 192px;
    height: auto;
    min-height: 100vh;
    background-color: #fff;
    border-radius: 0 24px 24px 0;
    margin-right: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 24px;
    box-shadow: 6px 0 10px 0 rgba(59, 84, 60, 0.15);
    /deep/ .el-menu {
      border-right: none !important;
    }
    .menu-icon {
      width: 40px;
      height: 34px;
      margin-bottom: 12px;
    }
    .product-name {
      font-size: 18px;
      color: #11b07a;
      font-weight: 500;
      margin-bottom: 36px;
    }
    .menu {
      width: 100%;
      flex-grow: 1;
    //   overflow: hidden;
        // background-color: pink;
    }
  }
  .content-container {
      display: flex;
      flex-direction: column;
    padding: 30px 32px 30px 0;
    flex: 1;
    // background-color: #fff;
    // border-radius: 24px 0 0 24px;
    // box-shadow: -2px 0 8px 0 rgba(0, 0, 0, 0.15);
    .message-container {
      width: 100%;
      height: 48px;
      background-color: #fff;
      border-radius: 16px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      padding-left: 36px;
      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 8px;
        background-color: #11b07a;
      }
      .name {
        font-size: 14px;
        color: #666666;
        font-weight: 500;
        margin-right: 84px;
      }
      .tip-icon {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
      .message {
        font-size: 14px;
        color: #666666;
      }
    }
    .bread-crumb-container {
      width: 100%;
      height: 73px;
      padding-left: 36px;
      padding-top: 10px;
      margin-bottom: 5px;
    //   background-color: #fafafa;
    .current-breadcrumb {
        font-size: 16px;
        color: #11B07A;
        font-weight: 500;
        margin-bottom: 4px;
    }
    .current-line {
        width: 46px;
        height: 3px;
        border-radius: 10px;
        background: linear-gradient(to right, rgba(17, 176, 122, 1), rgba(20, 177, 124, 0.19), rgba(20, 177, 124, 0));
    }
    }
  }
}
</style>