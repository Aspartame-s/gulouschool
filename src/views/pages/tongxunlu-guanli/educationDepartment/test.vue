<template>
  <div class="item-container">
    <div class="import-back" @click="back">返回</div>
    <div class="import-container">
      <div class="title">批量导入通讯录</div>
      <div
        v-if="!isSuccess"
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <div class="load">
          请下载通讯录模板，按格式修改后导入
          <a class="load-btn" href="/template.xlsx" download
            >下载模板</a
          >
        </div>
        <div class="import">
          <div class="import-top">
            <el-upload
              class="upload-demo"
              drag
              :before-upload="beforeAvatarUpload"
              action="111"
            >
              <!-- <i class="el-icon-upload"></i> -->
              <img :src="uploadIcon" alt="" class="upload-icon" />
              <div v-if="!isUploaded">
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__text">支持xls、xlsx格式</div>
                <div
                  style="
                    display: flex;
                    justify-content: center;
                    margin-top: 16px;
                  "
                >
                  <div class="upload-btn">上传文件</div>
                </div>
              </div>
              <div v-if="isUploaded">
                <div class="file-name">{{ fileName }}</div>
                <div
                  style="
                    display: flex;
                    justify-content: center;
                    margin-top: 16px;
                  "
                >
                  <div class="upload-btn">重新上传</div>
                </div>
              </div>
            </el-upload>
          </div>
          <div class="import-bottom">
            文件中的成员将被导入至：
            <div class="unit-box">
              <i
                class="iconfont icon-wenjian"
                style="margin-right: 3px; font-size: 16px"
              ></i>
              鼓楼区教师发展中心
            </div>
            <div class="edit">修改</div>
          </div>
        </div>
        <div class="import-btn" @click="importFile">导入</div>
      </div>
      <div v-if="isSuccess">
        <div class="upload-success">
          <img
            src="../../../../assets/img/uploadSuccess.png"
            alt=""
            class="upload-success-icon"
          />
          成功导入{{ successUploadPersonNum }}人，覆盖导入{{
            coverPersonNum
          }}人，{{ noChangePersonNum }}人无变化
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { importAddressBook } from "@/api/addressbook";
export default {
  components: {},
  data() {
    return {
      uploadIcon: require("../../../../assets/img/excel1.png"),
      uploadFileUrl:
        process.env.VUE_APP_BASE_API + "/employee/excel-batch-import",
      isUploaded: false,
      fileName: "",
      file: null,
      isSuccess: false,
      successUploadPersonNum: 3,
      coverPersonNum: 3,
      noChangePersonNum: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    beforeAvatarUpload(file) {
      console.log(file);
      this.file = file;
      this.uploadIcon = require("../../../../assets/img/excel2.png");
      this.isUploaded = true;
      this.fileName = file.name;
      return false;
    },
    // handleAvatarSuccess(res, file, list) {
    //   console.log(res);
    //   console.log(file);
    //   console.log(list);
    // },
    importFile() {
      let fd = new FormData();
      fd.append("file", this.file); //传文件
      fd.append("deptId", "1590588066309742593"); //传其他参数
      importAddressBook(fd).then((res) => {
        console.log(res);
        if (res.code == "200") {
          //   this.uploadIcon = require("../../../../assets/img/excel2.png");
          //   this.isUploaded = true;
          //   this.fileName = file.name;
          this.isSuccess = true;
        }
      });
    },
    back() {
      this.$router.push("/address-management/education-department");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.import-back {
  width: 63px;
  height: 28px;
  border-radius: 4px;
  @include center;
  color: #fff;
  background-color: #02bba4;
  font-size: 14px;
  margin-bottom: 23px;
}
.import-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 16px;
    margin-bottom: 28px;
    color: #222;
  }
  .load {
    width: 675px;
    height: 48px;
    @include between;
    padding: 0 15px;
    color: #056244;
    font-size: 14px;
    background-color: rgba(0, 216, 138, 0.1);
    border: 1px solid #056244;
    border-radius: 4px;
    margin-bottom: 12px;
    .load-btn {
      width: 72px;
      height: 28px;
      border-radius: 4px;
      background-color: #fff;
      color: #11b07a;
      font-size: 14px;
      @include center;
      border: 1px solid #11b07a;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .import {
    width: 675px;
    height: 296px;
    border-radius: 4px;
    border: 1px solid #999999;
    .import-top {
      width: 100%;
      padding-top: 40px;
      height: 236px;
      border-bottom: 1px solid #999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      /deep/ .el-upload-dragger {
        border: none;
      }
      .upload-icon {
        width: 60px;
        height: 60px;
        margin-bottom: 16px;
      }
      .upload-btn {
        width: 72px;
        height: 28px;
        border-radius: 4px;
        border: 1px solid #11b07a;
        @include center;
        font-size: 14px;
        color: #11b07a;
      }
    }
    .import-bottom {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      color: #222;
      position: relative;
      padding: 0 16px;
      .unit-box {
        width: auto;
        padding: 9px;
        height: 36px;
        color: #11b07a;
        border-radius: 4px;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-left: 4px;
        border: 1px solid #11b07a;
      }
      .edit {
        color: #056244;
        position: absolute;
        right: 16px;
      }
    }
  }
}
.import-btn {
  width: 324px;
  height: 40px;
  background: #11b07a;
  border-radius: 4px;
  @include center;
  color: #fff;
  font-size: 16px;
  margin-top: 22px;
}
.upload-success {
  width: 100%;
  height: auto;
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #11b07a;
  font-size: 16px;
  .upload-success-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 14px;
  }
}
</style>