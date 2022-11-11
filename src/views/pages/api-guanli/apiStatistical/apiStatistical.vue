<template>
  <div class="item-container">
    <div class="search-container">
      <div class="search-box">
        <span class="common-tip">应用名称</span>
        <el-input placeholder="请输入内容" v-model="input"> </el-input>
      </div>
    </div>
    <my-table :tableData="tableData" :columnList="tableColList" :handleList="handleList"></my-table>
  </div>
</template>

<script>
import myTable from "@/components/myTable.vue";

export default {
  components: { myTable },
  data() {
    return {
      input: "",
      tableColList: [
        // 表头
        {
          prop: "yingyongname",
          label: "应用名称",
        },
        {
          prop: "num",
          label: "调用次数",
        }
      ],
      tableData: [
          {
              id: 1,
              yingyongname: '江苏省名师空中课堂',
              num: 668,
              icon: require('../../../../assets/img/图片2@3x 1.png')
          },
          {
              id: 2,
              yingyongname: '国家中小学智慧教育平台',
              num: 7789,
              icon: require('../../../../assets/img/图片@3x (1) 1.png')
          },
      ],
      handleList: [
        {
          handleName: "查看详情",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
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
    margin-left: 48px;
    margin-right: 48px;
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
      width: 150px;
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
</style>