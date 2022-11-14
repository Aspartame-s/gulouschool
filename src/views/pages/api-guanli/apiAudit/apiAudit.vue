<template>
  <div class="item-container">
    <div v-if="!showDetail">
      <div class="search-container">
        <div class="search-box-name">
          <el-input
            placeholder="应用名称"
            v-model="inputName"
            prefix-icon="el-icon-search"
          >
          </el-input>
        </div>
        <div class="select-box">
          <span class="common-tip">应用级别</span>
          <el-select v-model="selectLevelValue" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-box">
          <span class="common-tip">应用类型</span>
          <el-select v-model="selectTypeValue" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="box">
          <span class="demonstration common-tip">申请时间</span>
          <el-date-picker
            v-model="timeValue"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div class="select-box">
          <span class="common-tip">申请状态</span>
          <el-select v-model="selectStatuValue" placeholder="请选择">
            <el-option
              v-for="item in statuOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <my-table
        :tableData="testTableData"
        :columnList="tableColList"
        :handleList="handleList"
        @handleRow="handleRow(arguments)"
        id="table"
      >
      </my-table>
    </div>
    <div class="detail" v-if="showDetail">
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="应用名称:">
          <div>{{ formInfo.name }}</div>
        </el-form-item>
        <el-form-item label="应用级别:">
          <div>{{ formInfo.level }}</div>
        </el-form-item>
        <el-form-item label="应用类型:">
          <div>{{ formInfo.type }}</div>
        </el-form-item>
        <el-form-item label="web端URL:">
          <div>{{ formInfo.url }}</div>
        </el-form-item>
        <el-form-item label="应用图标:">
          <!-- <div>{{formInfo.name}}</div> -->
          <img :src="formInfo.icon" alt="" class="form-item-img" />
        </el-form-item>
        <el-form-item label="授权发起域名:">
          <div>{{ formInfo.yumin }}</div>
        </el-form-item>
        <el-form-item label="应用简介:">
          <div>{{ formInfo.desc }}</div>
        </el-form-item>
      </el-form>
      <div class="success-info" v-if="showSuccessInfo">
          <div class="info-item first">
              <i class="el-icon-success"></i>
              已通过，并发送以下数据至对方账号
              </div>
          <div class="info-item second">App_ID：381273872</div>
          <div class="info-item second" >Secret：djlaksj213jasld232saa</div>
      </div>
      <div class="btn-container" v-if="isSuccess">
        <div class="success btn" @click="success">通过</div>
        <div class="fail btn" @click="fail">不通过</div>
      </div>
      <div class="btn-container" v-if="!isSuccess">
        <div class="fail btn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import myTable from "@/components/myTable.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: { myTable },
  data() {
    return {
      form: {},
      isSuccess: true,
      showSuccessInfo: false,
      levelOptions: [
        {
          value: "选项1",
          label: "级别1",
        },
        {
          value: "选项2",
          label: "级别2",
        },
        {
          value: "选项3",
          label: "级别3",
        },
        {
          value: "选项4",
          label: "级别4",
        },
        {
          value: "选项5",
          label: "级别5",
        },
      ],
      typeOptions: [
        {
          value: "选项1",
          label: "类型1",
        },
        {
          value: "选项2",
          label: "类型2",
        },
        {
          value: "选项3",
          label: "类型3",
        },
        {
          value: "选项4",
          label: "类型4",
        },
        {
          value: "选项5",
          label: "类型5",
        },
      ],
      statuOptions: [
        {
          value: "选项1",
          label: "状态1",
        },
        {
          value: "选项2",
          label: "状态2",
        },
        {
          value: "选项3",
          label: "状态3",
        },
        {
          value: "选项4",
          label: "状态4",
        },
        {
          value: "选项5",
          label: "状态5",
        },
      ],
      selectLevelValue: "",
      selectTypeValue: "",
      selectStatuValue: "",
      inputName: "",
      input: "",
      timeValue: "",
      tableColList: [
        // 表头
        {
          prop: "name",
          label: "应用名称",
        },
        {
          prop: "level",
          label: "应用级别",
        },
        {
          prop: "type",
          label: "应用类型",
        },
        {
          prop: "time",
          label: "申请时间",
        },
        {
          prop: "statu",
          label: "申请状态",
        },
      ],

      handleList: [
        {
          handleName: "查看详情",
        },
      ],
      formInfo: {},
      showDetail: false,
    };
  },
  computed: {
    ...mapState(["testTableData", "currentAuditIndex"]),
  },
  watch: {},
  methods: {
    ...mapMutations(["setCurrentAuditIndex"]),
    handleRow(arg) {
      this.showDetail = true;
      console.log(arg);
      this.formInfo = arg[1];
      if(arg[1].statu !== '待审核') {
          this.showSuccessInfo = true
          this.isSuccess = false
      }else {
          this.showSuccessInfo = false
          this.isSuccess = true
      }
      this.setCurrentAuditIndex({ index: arg[0] });
    },
    success() {
      this.testTableData[this.currentAuditIndex].statu = '已通过';
      this.isSuccess = false
      this.showSuccessInfo = true
    },
    fail() {
        console.log()
      this.testTableData[this.currentAuditIndex].statu = '未通过';
    },
    back() {
        this.showDetail = false
    }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.item-container {
  padding-bottom: 80px;
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
  justify-content: space-between;
  align-items: center;
  .box {
    height: 30px;
    display: flex;
    align-items: center;
    .el-input {
      width: 187px;
      /deep/ .el-input__inner {
        padding: 0 0 0 30px;
      }
      /deep/ .el-input__icon {
        line-height: 30px;
        color: #11b07a;
      }
    }
  }
  .select-box {
    height: 30px;
    display: flex;
    align-items: center;
    /deep/ .el-input__suffix {
      height: 120%;
    }
  }
  .search-box {
    height: 30px;
    display: flex;
    align-items: center;
    span {
      height: 30px;
      display: flex;
      align-items: center;
    }
    .el-input {
      width: 112px;
    }
  }
  .search-box-name {
    height: 30px;
    display: flex;
    align-items: center;
    .el-input {
      width: 164px;
      /deep/ .el-input__inner {
        padding: 0 0 0 30px;
      }
      /deep/ .el-input__icon {
        line-height: 30px;
        color: #11b07a;
      }
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
.detail {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn-container {
    width: 100%;
    height: 40px;
    margin-top: 50px;
    @include center;
    .btn {
      width: 120px;
      height: 40px;
      border-radius: 4px;
      @include center;
      font-size: 16px;
    }
    .success {
      background-color: #11b07a;
      color: #fff;
      margin-right: 44px;
    }
    .fail {
      border: 1px solid #d9d9d9;
      color: #666;
    }
  }
  .success-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-top: 20px;
    .info-item {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        font-size: 14px;
        .el-icon-success {
            color: #11B07A;
        }
    }
    .second {
        color: #4D9EFF;
    }
  }
  /deep/ .el-form {
    height: auto;
  }
  /deep/.el-form-item {
    height: auto;
    margin-bottom: 10px;
    div {
      height: auto;
      max-width: 200px;
      line-height: 30px;
    }
    .form-item-img {
      width: 80px;
      height: 80px;
      vertical-align: middle;
    }
    .el-form-item__label-wrap {
      height: 30px;
    }
    .el-form-item__label {
      height: 30px;
      line-height: 30px;
    }
    .el-form-item__content {
      height: auto;
    }
  }
}
</style>