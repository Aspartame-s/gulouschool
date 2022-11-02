<template>
  <div class="item-container">
    <div v-if="true">
      <div class="handle-btn-container">
        <div class="add-unit yellow-btn">新建单位</div>
        <div class="freeze-unit yellow-btn">冻结单位</div>
      </div>
      <my-table
        :tableData="tableData1"
        :columnList="columnList"
        :handleList="handleList"
      ></my-table>
    </div>
    <div>
      <div class="title">单位信息</div>

      <my-form
        ref="myForm"
        :formHeader="formHeader"
        @submitForm="submitForm"
        @resetForm="resetForm"
      >
      </my-form>
      <el-button @click="modify">编辑</el-button>
      <el-button @click="showData">数据回显</el-button>
    </div>
  </div>
</template>

<script>
import myTable from "@/components/myTable.vue";
import myForm from "@/components/myForm.vue";
import { formHeader, tableData1, handleList, columnList } from "./data";
import { getEduUnitList } from "@/api/education";
export default {
  components: {
    myTable,
    myForm,
  },
  data() {
    return {
      tableData1,
      columnList,
      handleList,
      formHeader,
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    modify() {
      console.log(123);
      this.formHeader.forEach((item) => {
        item.readonly = false;
      });
    },
    showData() {
      let form = {
        name: "jth",
        age: 18,
      };
      this.$refs.myForm.form = form;
    },
    submitForm(form) {
      console.log("表单提交喽", form);
    },
    resetForm() {
      console.log("表单重置喽");
    },
    //获取教育单位列表
    getEduUnitList() {
      getEduUnitList().then((res) => {
        console.log(res);
        this.tableData1 = res.data
      });
    },
  },
  created() {},
  mounted() {
      this.getEduUnitList()
  },
};
</script>
<style lang='scss' scoped>
.title {
  width: auto;
  margin-bottom: 10px;
  color: #222;
  font-size: 16px;
}
.form-container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}
</style>