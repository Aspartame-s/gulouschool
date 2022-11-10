<template>
  <div class="item-container">
    <div v-if="unitManageSHow">
      <div class="handle-btn-container">
        <div class="add-unit yellow-btn" @click="addNewUnit">新建单位</div>
        <!-- <div class="freeze-unit yellow-btn">冻结单位</div> -->
      </div>
      <my-table
        :tableData="tableData1"
        :columnList="columnList"
        :handleList="handleList"
        @handleRow="handleRow(arguments)"
        ref="myTable"
      ></my-table>
    </div>
    <div v-if="unitInfoShow">
      <div class="title">单位信息</div>

      <my-form
        ref="myForm"
        :formHeader="formHeader"
        @submitForm="submitForm"
        @resetForm="resetForm"
        @showUnitManage="showUnitManage"
        @submit="submit(arguments)"
        @modify="modify"
      >
      </my-form>
      <!-- <div class="btn-container">
        <div class="btn back" @click="showUnitManage">返回</div>
        <div class="btn edit" @click="modify">编辑</div>
        <div class="btn submit" @click="submit">提交</div>
      </div> -->
    </div>
    <div class="tree-area" v-if="addressbookShow">
      <div class="tree-box">
        <my-tree
          :data="treeData"
          @loadChildNode="loadChildNode(arguments)"
          @appendNode="appendNode(arguments)"
          @deleteNode="deleteNode"
          @editNode="editNode(arguments)"
          @getAccurateEmployeeList="getAccurateEmployeeList"
          :expandedKey="expandedKey"
        ></my-tree>
      </div>
      <div style="flex-grow: 1">
        <div class="handle-container">
          <div
            :class="['btn', item.color]"
            v-for="item in handleBtnList"
            :key="item.id"
            @click="btnHandle(item.id)"
          >
            {{ item.name }}
          </div>
        </div>
        <my-table
          :tableData="employeeTableData"
          :columnList="employeeColumnList"
          :handleList="employeeHandleList"
          @handleRow="handleRow(arguments)"
          :hasSelect="true"
          @selectSingle="selectSingle"
          @selectAll="selectAll"
          ref="parentTable"
          id="table"
        ></my-table>
      </div>
    </div>

    <!-- 人员编辑界面 -->
    <div v-if="true">
      <div class="title">单位信息</div>

      <my-form
        ref="myForm"
        :formHeader="employeeFormHeader"
        @submitForm="submitForm"
        @resetForm="resetForm"
        @submitEmployee="submitEmployee(arguments)"
      >
      </my-form>
      <!-- <div class="btn-container">
        <div class="btn back" @click="showUnitManage">返回</div>
        <div class="btn edit" @click="modify">编辑</div>
        <div class="btn submit" @click="submit">提交</div>
      </div> -->
    </div>

  </div>
</template>

<script>
import myTable from "@/components/myTable.vue";
import myForm from "@/components/myForm.vue";
import myTree from "@/components/myTree.vue";
import {
  formHeader,
  tableData1,
  handleList,
  columnList,
  employeeColumnList,
  employeeHandleList,
  employeeFormHeader
} from "./data";
import {
  getEduUnitList,
  freezeEduUnit,
  addEduUnit,
  editEduUnit,
} from "@/api/education";
import {
  getAddressbookDeplList,
  appendDept,
  deleteDept,
  editDept,
} from "@/api/addressbook";
import {
  getAllEmployeeList,
  deleteEmployee,
  deleteEmployees,
  addNewEmployee
} from "@/api/employee";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
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
      employeeFormHeader,
      eduUnitId: "",
      treeData: [],
      expandedKey: "", //需要展开的id && 部门id
      handleBtnList: [
        {
          id: 1,
          name: "添加成员",
          color: "yellow-btn",
        },
        {
          id: 2,
          name: "批量移动",
          color: "yellow-btn",
        },
        {
          id: 3,
          name: "批量导入",
          color: "yellow-btn",
        },
        {
          id: 4,
          name: "批量导出",
          color: "yellow-btn",
        },
        {
          id: 5,
          name: "删除",
          color: "red-btn",
        },
      ],
      unitManageSHow: true,
      unitInfoShow: false,
      addressbookShow: false,
      infoForm: {},
      deptId: "", //部门id 根据部门id查询员工(包含子部门)
      employeeColumnList, //人员表头
      employeeHandleList, //人员操作栏
      employeeTableData: [], //人员表格数据
      idArr: "", //被选择人员的id 字符串
    };
  },
  computed: {
    ...mapState(["currentDepId", "formSubmitFlag"]),
  },
  watch: {
    $route(e) {
      console.log(e);
      if (e.path == "/address-management/education-department") {
        this.unitManageSHow = true;
        this.unitInfoShow = false;
        this.addressbookShow = false;
      }
    },
  },
  methods: {
    ...mapMutations(["setCurrentDepId", "setFormSubmitFlag"]), //vuex 设置部门id
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
    modify(arg) {
      this.formHeader.forEach((item) => {
        item.readonly = false;
      });
    },
    showUnitManage() {
      this.unitManageSHow = true;
      this.unitInfoShow = false;
      this.addressbookShow = false;
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
        // console.log(res);
        this.tableData1 = res.data;
        this.tableData1.forEach((item) => {
          this.$set(item, "type", 0);
        });
        console.log(this.tableData1);
      });
    },
    //通讯录部门列表
    getAddressbookDeplList(eduUnitId, id, pid, time) {
      getAddressbookDeplList(eduUnitId, id, pid).then((res) => {
        console.log(res);
        if (time == "first") {
          this.expandedKey = res.data[0].id;
        }
        res.data.forEach((item) => {
          this.$set(item, "isLeaf", !item.hasSons);
        });
        this.treeData = res.data;
        this.setCurrentDepId({ id: res.data[0].id });
        this.getAllEmployeeList(res.data[0].id); //在部门列表接口里调用获取部门人员接口感觉有点问题
      });
    },
    //table 操作栏
    handleRow(data) {
      const info = data[1];
      console.log(info);
      // this.infoForm = info
      this.eduUnitId = info.id;
      const handleFlag = data[2]; // 1查看单位信息 2查看通讯录 3冻结单位 4编辑人员信息 5删除人员
      switch (handleFlag) {
        case 1:
          this.setFormSubmitFlag({formSubmitFlag: 'unit'})
          this.unitManageSHow = false;
          this.unitInfoShow = true;
          this.addressbookShow = false;
          this.formHeader.forEach((item) => {
            //控制每项只读
            item.readonly = true;
          });
          this.$nextTick(() => {
            // console.log(this.$refs.myForm)
            this.$refs.myForm.form = info;
          });
          console.log(this.formSubmitFlag)
          break;
        case 2:
          this.getAddressbookDeplList(this.eduUnitId, "", 0, "first");
          this.unitManageSHow = false;
          this.unitInfoShow = false;
          this.addressbookShow = true;
          break;
        case 3:
          this.unitManageSHow = true;
          this.unitInfoShow = false;
          this.addressbookShow = false;
          const data = {
            id: info.id,
          };
          // this.formHeader.forEach((item) => {
          //   //控制每项可编辑
          //   item.readonly = false;
          // });
          // this.$nextTick(() => {
          //   this.$refs.myForm.form = info;
          // });
          break;
        case 4:
          console.log("编辑人员");
          break;
        case 5:
          console.log("删除人员");
          const employId = info.id;
          this.deleteEmployee(employId);
          break;
      }
      console.log(data);
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
      setTimeout(() => {
        //这里没有用 this.getAddressbookDeplList 方法 而是直接使用http的接口方法 所以和全局获取部门列表接口无关 这是一个独立的获取部门列表的接口
        getAddressbookDeplList(this.eduUnitId, "", arg[0].data.id).then(
          (res) => {
            res.data.forEach((item) => {
              this.$set(item, "isLeaf", !item.hasSons);
            });
            resolve(res.data);
          }
        );
      }, 500); // settimeout 控制 加载节点速度，防止已编辑节点后 节点刷新过慢，加载还是编辑前节点
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
        const msg = res.msg;
        if (res.code == 500) {
          this.$message({
            message: msg,
            type: "warning",
          });
        }
      });
    },
    //编辑部门 (接口)
    editDept(data) {
      editDept(data).then((res) => {
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
      this.expandedKey = arg[1].id;
      this.getAddressbookDeplList(this.eduUnitId, "", 0);
    },

    //删除部门(子组件方法)
    async deleteNode(arg) {
      await this.deleteDept(arg.id);
      this.expandedKey = arg.pid;
      this.getAddressbookDeplList(this.eduUnitId, "", 0);
    },

    //编辑部门(子组件方法)
    async editNode(arg) {
      let data = arg[0];
      let value = arg[1];
      const data1 = {
        eduUnitId: data.eduUnitId,
        id: data.id,
        name: value,
        namePath: data.namePath,
        pid: data.pid,
      };
      await this.editDept(data1);
      this.expandedKey = data.pid;
      this.getAddressbookDeplList(this.eduUnitId, "", 0);
    },

    //人员
    //根据部门id查询员工(包含子部门)
    getAllEmployeeList(id) {
      getAllEmployeeList(id).then((res) => {
        let employeeList = res.data;
        //给每个item 添加一个自定义字段, 将多个部门拼接
        employeeList.forEach((item) => {
          let deptList = item.addrbookDepts;
          var dept = "";
          deptList.forEach((self) => {
            if (self) {
              dept = dept + self.name + ";";
            }
          });
          this.$set(item, "dept", dept);
        });
        // console.log(res)
        this.employeeTableData = employeeList;
      });
    },
    //点击部门 搜索该部门（包含子部门下的员工）
    getAccurateEmployeeList(id) {
      this.setCurrentDepId({ id: id });
      this.getAllEmployeeList(id);
    },
    //table 顶部颜色按钮操作
    btnHandle(id) {
      // 1添加成员 2批量移动 3批量导入 4批量导出 5删除
      switch (id) {
        case 1:
          console.log("添加成员");
          this.setFormSubmitFlag({formSubmitFlag: 'employee'})
          break;
        case 2:
          console.log("批量移动");
          break;
        case 3:
          console.log("批量导入");
          break;
        case 4:
          // console.log("批量导出");
          // console.log(this.$refs.parentTable.$children[0].$el.id)
          // const eleId = this.$refs.parentTable.$children[0].$el.id;
          // console.log(document.querySelector('table'))
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
              "sheetjs.xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
          break;
        case 5:
          console.log("删除");
          this.deleteEmployees(this.idArr);
          break;
      }
    },
    //冻结单位
    freezeEduUnit(data) {
      freezeEduUnit(data).then((res) => {
        console.log(res);
      });
    },
    //删除人员
    deleteEmployee(id) {
      deleteEmployee(id).then((res) => {
        console.log(res);
        this.getAccurateEmployeeList(this.currentDepId);
      });
    },

    //批量删除方法
    deleteEmployees(str) {
      deleteEmployees(str).then((res) => {
        console.log(res);
        this.getAccurateEmployeeList(this.currentDepId);
      });
    },

    //单选删除（可以选择多个）
    selectSingle(arg) {
      this.idArr += arg.id + ",";
      console.log(this.idArr);
    },

    //全选删除
    selectAll(arg) {
      arg.forEach((item) => {
        this.idArr += item.id + ",";
      });
    },

    //新建单位接口方法
    addEduUnit(data) {
      addEduUnit(data).then((res) => {
        console.log(res);
      });
    },

    //新建单位按钮
    addNewUnit() {
      this.formHeader.forEach((item) => {
        item.readonly = false;
      });
      this.unitManageSHow = false;
      this.unitInfoShow = true;
      this.addressbookShow = false;
    },

    //提交按钮（新建单位 || 编辑单位 || 新建人员 || 编辑人员）
    submit(arg) {
      let flag = arg[1];
      if (flag == "add") {
        this.addEduUnit(arg[0]);
      }else if(flag == "modify") {
        this.editEduUnit(arg[0]);
      }
      this.unitManageSHow = true;
      this.unitInfoShow = false;
      this.addressbookShow = false;
    },

    //编辑单位接口方法
    editEduUnit(data) {
      editEduUnit(data).then((res) => {});
    },

    //编辑按钮
    modify() {
      this.formHeader.forEach((item) => {
        //控制每项可编辑
        item.readonly = false;
      });
    },

    //人员信息提交事件
    submitEmployee(arg) {
      console.log(arg)
      addNewEmployee(arg[0]).then(res => {
        console.log(res)
      })
    }
  },
  created() {},
  mounted() {
    this.getEduUnitList();
    // this.unitManageSHow = false;
    //     this.unitInfoShow = false;
    //     this.addressbookShow = false;
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
// .form-container {
//   width: 100%;
//   height: auto;
//   display: flex;
//   justify-content: center;
// }
.tree-area {
  width: 100%;
  height: 100%;
  // background-color: pink;
  display: flex;
  .tree-box {
    width: 210px;
    min-height: 100%;
    border-right: 1px solid #c9f0e1;
    margin-right: 28px;
  }
  .handle-container {
    width: 100%;
    height: 28px;
    // background-color: blue;
    margin-bottom: 24px;
    display: flex;
    .btn {
      margin-right: 24px;
    }
  }
}
.btn-container {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  &:last-child {
    margin-right: 0;
  }
  .btn {
    width: 120px;
    height: 40px;
    border-radius: 4px;
    @include center;
    font-size: 16px;
    margin-right: 44px;
  }
  .back {
    background-color: #11b07a;
    color: #fff;
  }
  .edit,
  .submit {
    border: 1px solid #666666;
  }
}
</style>