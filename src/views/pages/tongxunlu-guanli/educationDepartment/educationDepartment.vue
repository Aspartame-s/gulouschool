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
        @handleRow="handleRow(arguments)"
        ref="myTable"
      ></my-table>
    </div>
    <div v-if="false">
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
    <div>
      <my-tree
        :data="treeData"
        @loadChildNode="loadChildNode(arguments)"
        @appendNode="appendNode(arguments)"
        @deleteNode="deleteNode"
        :expandedKey="expandedKey"
      ></my-tree>
    </div>
  </div>
</template>

<script>
import myTable from "@/components/myTable.vue";
import myForm from "@/components/myForm.vue";
import myTree from "@/components/myTree.vue";
import { formHeader, tableData1, handleList, columnList } from "./data";
import { getEduUnitList } from "@/api/education";
import {
  getAddressbookDeplList,
  appendDept,
  deleteDept,
} from "@/api/addressbook";
export default {
  components: {
    myTable,
    myForm,
    myTree,
  },
  data() {
    return {
      tableData1: [],
      columnList,
      handleList,
      formHeader,
      eduUnitId: "",
      treeData: [],
      expandedKey: '', //需要展开的id
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
        this.tableData1 = res.data;
      });
    },
    //通讯录列表
    getAddressbookDeplList(eduUnitId, id, pid, time) {
      getAddressbookDeplList(eduUnitId, id, pid).then((res) => {
        // console.log(res)
        if(time == 'first') {
          this.expandedKey = res.data[0].id
        }
        res.data.forEach((item) => {
          this.$set(item, "isLeaf", !item.hasSons);
        });
        this.treeData = res.data;
      });
    },
    //table 操作栏
    handleRow(data) {
      console.log(data);
      const info = data[1];
      const flag = data[2];
      this.eduUnitId = info.id;
      this.getAddressbookDeplList(this.eduUnitId, "", 0, 'first');
    },
    // //加载第一层节点
    // async loadFirstNode(resolve) {
    //   const res = await this.getAddressbookDeplList(this.eduUnitId, '', 0)
    //   return resolve(res)
    // },
    //加载子节点
    loadChildNode(arg) {
      console.log(arg);
      const resolve = arg[1];
      getAddressbookDeplList(this.eduUnitId, "", arg[0].data.id).then((res) => {
        res.data.forEach((item) => {
          this.$set(item, "isLeaf", !item.hasSons);
        });
        resolve(res.data);
      });
    },
    //新增部门 (接口)
    appendDept(data) {
      appendDept(data).then((res) => {
        console.log(res);
      });
    },
    //删除部门 (接口)
    deleteDept(id) {
      deleteDept(id).then((res) => {
        console.log(res);
      });
    },
    //新增部门(子组件方法)
    // async
    async appendNode(arg) {
      const data = {
        eduUnitId: this.eduUnitId,
        name: arg[2],
        pid: arg[1].id,
      };
      await this.appendDept(data);
      this.expandedKey = arg[1].id
      this.getAddressbookDeplList(this.eduUnitId, "", 0);
    },

    //删除部门(子组件方法)
    async deleteNode(arg) {
      await this.deleteDept(arg.id);
      this.expandedKey = arg.pid
      this.getAddressbookDeplList(this.eduUnitId, "", 0);
    },
  },
  created() {},
  mounted() {
    this.getEduUnitList();
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