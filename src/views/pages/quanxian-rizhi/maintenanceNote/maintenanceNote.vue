<template>
  <div class="item-container">
    <div class="search-container">
      <div class="box">
        <span class="demonstration common-tip">时间</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="select-box">
        <span class="common-tip">操作类型</span>
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
        <span class="common-tip">操作者</span>
        <el-input placeholder="请输入内容" v-model="input">
        </el-input>
      </div>
      <div class="export" @click="exportNote">导出记录</div>
    </div>
    <my-table :tableData="tableData" :columnList="tableColList" id="table"> </my-table>
  </div>
</template>

<script>
import myTable from "@/components/myTable.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: { myTable },
  data() {
    return {
      tableColList: [
        // 表头
        {
          prop: "time",
          label: "时间",
        },
        {
          prop: "handler",
          label: "操作者",
        },
        {
          prop: "handleType",
          label: "操作类型",
        },
        {
          prop: "data",
          label: "相关数据",
        },
        {
          prop: "handlerIp",
          label: "操作者IP",
        },
      ],
      tableData: [
        {
          id: 1,
          time: "22分钟前",
          handler: "王小二",
          handleType: "登陆后台",
          data: " hello world",
          handlerIp: "114.222.54.*",
        },
        {
          id: 2,
          time: "一小时前",
          handler: "钱小二",
          handleType: "新增成员",
          data: " hello world",
          handlerIp: "114.222.54.*",
        },
        {
          id: 3,
          time: "昨天",
          handler: "赵小二",
          handleType: "删除家长",
          data: " hello world",
          handlerIp: "114.222.54.*",
        },
        {
          id: 4,
          time: "周一",
          handler: "李小二",
          handleType: "新增管理员",
          data: " hello world",
          handlerIp: "114.222.54.*",
        },
        {
          id: 5,
          time: "10月20日",
          handler: "孙小二",
          handleType: "新增管理员",
          data: " hello world",
          handlerIp: "114.222.54.*",
        },
      ],
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      selectValue: "",
      input: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
      exportNote() {
           let wb = XLSX.utils.table_to_book(document.querySelector("#table"));
          /* 获取二进制字符串作为输出 */
          var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array",
          });
          try {
            FileSaver.saveAs(
              //Blob 对象表示一个不可变、原始数据的类文件对象。
              //Blob 表示的不一定是JavaScript原生格式的数据。
              //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
              //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
              new Blob([wbout], { type: "application/octet-stream" }),
              //设置导出文件名称
              "日志.xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
      }
  },
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
      width: 112px;
      
    }
  }
  .export {
      width: 88px;
      height: 28px;
      background-color: #02BBA4;
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