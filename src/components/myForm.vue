<template>
  <div class="form-container">
    <el-form ref="form" :model="form" label-width="auto">
      <template v-for="(item, index) in formHeader">
        <!-- 当类型为普通文本输入框时 -->
        <el-form-item
          v-if="item.itemType == 'text'"
          :key="index"
          :label="item.labelName"
          :prop="item.propName"
          :rules="
            item.isRequired
              ? [
                  {
                    required: true, // 是否必填 是
                    trigger: 'blur', // 触发方式，失去焦点
                    itemType: 'text', // 当前类型，文字输入框
                    labelName: item.labelName, // 当前输入框的名字
                    value: form[item.propName], // 输入框输入的绑定的值
                    validator: validateEveryData, // 校验规则函数
                  },
                ]
              : []
          "
        >
          <el-input
            :placeholder="item.placeholder"
            v-model.trim="form[item.propName]"
            size="small"
            :readonly="item.readonly"
          ></el-input>
        </el-form-item>

        <!-- 当类型为数字类型输入框时 -->
        <el-form-item
          v-if="item.itemType == 'number'"
          :key="index"
          :label="item.labelName"
          :prop="item.propName"
          :rules="
            item.isRequired
              ? [
                  {
                    required: true, // 是否必填 是
                    trigger: 'blur', // 触发方式，失去焦点
                    itemType: 'number', // 当前类型，文字输入框
                    labelName: item.labelName, // 当前输入框的名字
                    value: form[item.propName], // 输入框输入的绑定的值
                    validator: validateEveryData, // 校验规则函数
                  },
                ]
              : []
          "
        >
          <el-input
            :placeholder="item.placeholder"
            v-model.trim="form[item.propName]"
            @change="checkInput(item)"
            size="small"
            :readonly="item.readonly"
          >
            <span slot="suffix">{{ item.unit }}</span>
          </el-input>
        </el-form-item>
        <!-- 当类型为文本域输入框时 -->
        <el-form-item
          v-if="item.itemType == 'textarea'"
          :key="index"
          :label="item.labelName"
          :prop="item.propName"
          :rules="
            item.isRequired
              ? [
                  {
                    required: true, // 是否必填 是
                    trigger: 'blur', // 触发方式，失去焦点
                    itemType: 'textarea', // 当前类型，文本域输入框
                    labelName: item.labelName, // 当前输入框的名字
                    value: form[item.propName], // 输入框输入的绑定的值
                    validator: validateEveryData, // 校验规则函数
                  },
                ]
              : []
          "
        >
          <el-input
            type="textarea"
            :placeholder="item.placeholder"
            v-model.trim="form[item.propName]"
            :readonly="item.readonly"
            size="small"
          ></el-input>
        </el-form-item>

        <!-- 当类型为模糊搜索input时 -->
        <el-form-item
          v-if="item.itemType == 'search'"
          :key="index"
          :label="item.labelName"
          :prop="item.propName"
          :rules="
            item.isRequired
              ? [
                  {
                    required: true, // 是否必填 是
                    trigger: 'blur', // 触发方式，失去焦点
                    itemType: 'number', // 当前类型，文字输入框
                    labelName: item.labelName, // 当前输入框的名字
                    value: form[item.propName], // 输入框输入的绑定的值
                    validator: validateEveryData, // 校验规则函数
                  },
                ]
              : []
          "
        >
          <!-- <el-input
            :placeholder="item.placeholder"
            v-model.trim="form[item.propName]"
            @change="checkInput(item)"
            size="small"
            :readonly="item.readonly"
          >
            <span slot="suffix">{{ item.unit }}</span>
          </el-input> -->
          <el-autocomplete
            class="inline-input"
            v-model.trim="form[item.propName]"
            :fetch-suggestions="querySearch"
            :placeholder="item.placeholder"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>

        <!-- 当类型为下拉框二时，属于枚举值（单选）下拉框，需要根据枚举id发请求获取枚举值 -->
        <el-form-item
          v-if="item.itemType == 'selectTwo'"
          :key="index"
          :label="item.labelName"
          :prop="item.propName"
          :rules="
            item.isRequired
              ? [
                  {
                    required: true, // 是否必填 是
                    trigger: '', // blur 或 change 这里就不指定触发方式了，保存提交时再校验
                    itemType: 'selectTwo', // 当前类型，枚举值单选
                    labelName: item.labelName, // 当前输入框的名字
                    value: form[item.propName], // 输入框输入的绑定的值
                    validator: validateEveryData, // 校验规则函数
                  },
                ]
              : []
          "
        >
          <el-select
            v-model="form[item.propName]"
            :placeholder="item.placeholder"
            :disabled="item.readonly"
            @visible-change="
              (flag) => {
                getOptionsArr(flag, item);
              }
            "
            :loading="loadingSelect"
            size="small"
          >
            <el-option
              v-for="(ite, ind) in selectTwoOptionsObj[item.propName]"
              :key="ind"
              :label="ite.label"
              :value="ite.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
    <div class="btn-container">
      <div class="btn back" @click="showUnitManage">返回</div>
      <div class="btn edit" @click="modify">编辑</div>
      <div class="btn submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { getEduUnitList } from "@/api/education";
export default {
  props: {
    // 父组件传递过来的表头的数据
    formHeader: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {},
  data() {
    var validateEveryData = (rule, value, callback) => {
      //   console.log("callback", callback);
      console.log("校验某一项的规则对象", rule);
      console.log("用户输入的值", value);

      // 对输入框类型的校验
      if (value) {
        if ((value + "").length > 0) {
          // 用于回显时候的校验，因为输入的时候是字符串类型的数字，但是回显的时候可能就是数字
          callback(); // cb函数告知校验结果，必须要加
          return;
        }
      }

      // 对下拉框类型的校验
      if (
        (rule.itemType == "selectOne") |
        (rule.itemType == "selectTwo") |
        (rule.itemType == "selectThree")
      ) {
        if (value) {
          if ((value + "").length > 0) {
            // 注意枚举值是数字类型的，所以这里要转换成为字符串类型的
            callback();
            return;
          }
        }
      }

      // 根据不同的类型给予不同的校验提示
      switch (rule.itemType) {
        case "text":
          callback(new Error(rule.labelName + "不能为空")); // 文本类型的规则简单，就是得填写
          break;
        case "number":
          callback(new Error(rule.labelName + "请按规则填写")); // 数字类型的规则比较繁多
          break;
        case "textarea":
          callback(new Error(rule.labelName + "不能为空")); // 文本域类型的规则也简单，就是得填写
          break;
        case "selectOne":
          callback(new Error("请选择" + rule.labelName)); // 下拉框类型一 得填写
          break;
        case "selectTwo":
          callback(new Error("请选择" + rule.labelName)); // 下拉框类型二 得填写
          break;
        case "selectThree":
          callback(new Error("请选择" + rule.labelName)); // 下拉框类型三 多选数组得填写
          break;
        case "dateRange":
          callback(new Error("请选择" + rule.labelName + "范围")); // 下拉框类型三 多选数组得填写
          break;
        case "search":
          callback(new Error(rule.labelName + "不能为空"));
          break;

        default:
          break;
      }
    };
    return {
      // 此对象用于存储各个下拉框的数组数据值，其实也可以挂在vue的原型上，不过个人认为写在data中好些
      selectTwoOptionsObj: {},
      // 用于下拉框加载时的效果
      loadingSelect: false,
      // 绑定的数据
      form: {},
      // 校验规则
      validateEveryData: validateEveryData,
      pid: "",
      handleFlag: "modify",
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 数字类型加校验规则
    checkInput(item) {
      console.log("数字类型的再细分规则，可以根据item.labelName再写判断", item);
      if (item.labelName == "年龄") {
        let reg = /^[1-9]\d*$/;
        if (reg.test(this.form[item.propName] * 1)) {
          // console.log("符合要求，年龄大于0的正整数");
        } else {
          this.form[item.propName] = null;
        }
      }
      if (item.labelName == "工资") {
        let reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/;
        if (reg.test(this.form[item.propName] * 1)) {
          // console.log("符合要求，工资保留两位小数");
          this.form[item.propName] = (this.form[item.propName] * 1).toFixed(2);
        } else {
          this.form[item.propName] = null;
        }
      }
      if ("某个数字类型字段值") {
        // 加对应规则
      }
    },
    getOptionsArr(flag, item) {
      console.log(flag, item);
    },
    showUnitManage() {
      //返回按钮
      this.$emit("showUnitManage");
      console.log(this.form);
    },
    modify() {
      this.handleFlag = "modify";
      this.$emit("modify");
    },
    submit() {
      // 提交按钮
      let form2 = Object.assign({}, this.form);
      if (this.pid) {
        form2.pid = this.pid;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("submit", form2, this.handleFlag);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //模糊搜索
    async querySearch(queryString, cb) {
      const arr = await this.getEduUnitList("", "", queryString);
      arr.forEach((item) => {
        item = Object.assign(item, { value: item.name });
      });
      console.log(arr);
      cb(arr);
    },

    //选择搜索项
    handleSelect(item) {
      // console.log(item);
      this.pid = item.id;
      // console.log(form)
    },

    //搜索上级单位
    getEduUnitList(id, pid, query) {
      return new Promise(function (resolve, reject) {
        getEduUnitList(id, pid, query).then((res) => {
          resolve(res.data);
        });
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      cursor: pointer;
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
}
</style>