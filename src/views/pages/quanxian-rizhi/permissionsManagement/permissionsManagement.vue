<template>
  <div class="item-container">
    <div v-if="showAdmin">
      <div class="search-container">
        <div class="select-box">
          <span class="common-tip">权限等级</span>
          <el-select v-model="selectValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-box">
          <span class="common-tip">单位类型</span>
          <el-input placeholder="请输入内容" v-model="unitType"> </el-input>
        </div>
        <div class="search-box">
          <span class="common-tip">姓名</span>
          <el-input placeholder="请输入内容" v-model="name"> </el-input>
        </div>
        <div class="search-box">
          <span class="common-tip">手机号</span>
          <el-input placeholder="请输入内容" v-model="phone"> </el-input>
        </div>
      </div>
      <div class="add-admin-btn" @click="add">新增管理员</div>
      <my-table
        :tableData="adminTableData"
        :columnList="adminTableColList"
        :handleList="adminHandleList"
        @handleRow="handleRow(arguments)"
      ></my-table>
    </div>
    <div v-if="!showAdmin" style="height: 100%">
      <div class="title">
        新增管理员
        <div class="btn" @click="addNewAdmin">确认</div>
      </div>
      <div class="line"></div>
      <div class="add-admin-container">
        <div class="left-search">
          <el-autocomplete
            class="inline-input"
            v-model.trim="searchInput"
            :fetch-suggestions="querySearch"
            placeholder="请输入姓名进行搜索"
            :trigger-on-focus="true"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="right-table">
          <my-table
            :tableData="employeeTableData"
            :columnList="employeeTableColList"
            :hasLevelSelect="true"
            :options="options"
          ></my-table>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSelfEmployeeList } from "@/api/employee";
import { getAddressbookDeplList } from "@/api/addressbook";
import { getEduUnitList } from "@/api/education";
// import myTree from "@/components/myTree.vue";
import myTable from "@/components/myTable.vue";
import {
  adminTableColList,
  adminTableData,
  adminHandleList,
  employeeTableColList,
  employeeTableData,
  employeeHandleList,
  employeeList
} from "./data";

export default {
  components: { myTable },
  data() {
    return {
      treeData: [],
      options: [
        {
          value: "区级管理员",
          label: "区级管理员",
        },
        {
          value: "市级管理员",
          label: "市级管理员",
        },
      ],
      selectValue: "",
      unitType: "",
      name: "",
      phone: "",
      showAdmin: true,
      //管理员table信息
      adminTableColList,
      adminTableData,
      adminHandleList,
      //新增管理员的table信息
      employeeTableColList,
      employeeTableData,
      employeeHandleList,
      //人员列表
      employeeList,
      searchInput: "",
      options: [{
            value: '区级管理员',
            label: '区级管理员'
        }, {
            value: '市级管理员',
            label: '市级管理员'
        }, {
            value: '省级管理员',
            label: '省级管理员'
        }],
    };
  },
  computed: {},
  watch: {},
  methods: {
    //单位列表
    getEduUnitList() {
      getEduUnitList().then((res) => {
        this.treeData = res.data;
      });
    },

    //通讯录部门列表
    getAddressbookDeplList(eduUnitId, id, pid, time) {
      getAddressbookDeplList(eduUnitId, id, pid).then((res) => {
        console.log(res);
      });
    },

    //加载子节点
    loadChildNode(arg) {
      console.log(arg);
      const node = arg[0];
      const eduid = node.data.id;
      const resolve = arg[1];
      getAddressbookDeplList(eduid, "", 0).then((res) => {
        res.data.forEach((item) => {
          this.$set(item, "isLeaf", !item.hasSons);
        });
        resolve(res.data);
      });
      //   setTimeout(() => {
      //     //这里没有用 this.getAddressbookDeplList 方法 而是直接使用http的接口方法 所以和全局获取部门列表接口无关 这是一个独立的获取部门列表的接口
      //     getAddressbookDeplList(this.eduUnitId, "", arg[0].data.id).then(
      //       (res) => {
      //         res.data.forEach((item) => {
      //           this.$set(item, "isLeaf", !item.hasSons);
      //         });
      //         resolve(res.data);
      //       }
      //     );
      //   }, 500); // settimeout 控制 加载节点速度，防止已编辑节点后 节点刷新过慢，加载还是编辑前节点
    },

    add() {
        this.showAdmin = false
    },
    //模糊搜索
    querySearch(queryString, cb) {
      console.log(queryString);
      let arr = [];
      if (queryString !== "") {
        this.employeeList.forEach((item) => {
          if (item.name.indexOf(queryString) > -1) {
            arr.push(Object.assign(item, { value: item.name }));
          }
        });
      }
      console.log(arr);
      cb(arr);
    },
    //选择搜索项
    handleSelect(item) {
      console.log(item);
      this.employeeTableData.push(item)
    },
    addNewAdmin() {
        // this.adminTableData
        this.employeeTableData.forEach(item => {
            this.adminTableData.push(item)
        })
        this.showAdmin = true
        this.employeeTableData = []
        this.searchInput = ''
        console.log(this.employeeTableData)
    }
  },
  created() {},
  mounted() {
    this.getEduUnitList();
  },
};
</script>
<style lang='scss' scoped>
.title {
  width: 100%;
  height: 28px;
  @include between;
  color: #222;
  font-size: 16px;
  margin-bottom: 16px;
  .btn {
    width: 63px;
    height: 28px;
    background-color: #02BBA4;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    @include center;
  }
}
.line {
  width: 100%;
  height: 1px;
  background-color: #c9f0e1;
  margin-bottom: 5px;
}
.add-admin-container {
  width: 100%;
  //   height: auto;
  min-height: calc(100% - 50px);
  display: flex;
  .left-search {
    width: 192px;
    min-height: calc(100% - 50px);
    border-right: 1px solid #c9f0e1;
    margin-right: 28px;
  }
  .right-table {
      flex: 1;
  }
}
.common-tip {
  margin-right: 12px;
  font-size: 14px;
}
.search-container {
  width: 100%;
  height: 30px;
  position: relative;
  //   background-color: pink;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  .box {
    height: 30px;
    display: flex;
    align-items: center;
  }
  .select-box {
    height: 30px;
    display: flex;
    align-items: center;
    // margin-left: 48px;
    margin-right: 48px;
    /deep/ .el-input__suffix {
      height: 120%;
    }
  }
  .search-box {
    height: 30px;
    display: flex;
    align-items: center;
    margin-right: 48px;
    span {
      height: 30px;
      display: flex;
      align-items: center;
    }
    .el-input {
      width: 112px;
    }
  }
  .export {
    width: 88px;
    height: 28px;
    background-color: #02bba4;
    color: #fff;
    @include center;
    font-size: 14px;
    position: absolute;
    right: 0;
    border-radius: 4px;
  }
  /deep/ .el-input__inner {
    height: 30px;
    padding: 0 10px;
    border-color: #11b07a;
    font-size: 14px;
  }
  /deep/ .el-range-separator {
    margin-right: 20px;
  }
  /deep/ .el-range__icon {
    line-height: 30px;
  }
  /deep/ .el-range-separator {
    line-height: 30px;
  }
  /deep/ .el-icon-arrow-up:after {
    content: "";
  }

  /deep/ .is-reverse {
    transform: rotateZ(180deg) !important;
  }
  /deep/ .el-select {
    width: 112px;
  }
  /deep/ .el-icon-arrow-up:before {
    color: #11b07a;
  }
  /deep/ .el-select__caret {
    font-size: 8px;
  }
}
.add-admin-btn {
  width: 102px;
  height: 28px;
  border-radius: 4px;
  @include center;
  font-size: 14px;
  color: #fff;
  background-color: #fcaa30;
  margin-bottom: 24px;
}
.inline-input {
    margin-top: 20px;
    /deep/ .el-input__inner {
        height: 28px;
    }
}
</style>