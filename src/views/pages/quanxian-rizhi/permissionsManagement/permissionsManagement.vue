<template>
  <div class="item-container">
    <div class="tree-box">
      <my-tree
        :data="treeData"
        @loadChildNode="loadChildNode(arguments)"
        :showHandleIcon="false"
      ></my-tree>
    </div>
  </div>
</template>

<script>
import { getSelfEmployeeList } from "@/api/employee";
import {getAddressbookDeplList} from "@/api/addressbook"
import {getEduUnitList} from "@/api/education"
import myTree from "@/components/myTree.vue";

export default {
  components: { myTree },
  data() {
    return {
        treeData: []
    };
  },
  computed: {},
  watch: {},
  methods: {
      //单位列表
      getEduUnitList() {
          getEduUnitList().then(res => {
              this.treeData = res.data;
          })
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
      const node = arg[0]
      const eduid = node.data.id
      const resolve = arg[1];
      getAddressbookDeplList(eduid, '', 0).then(res => {
          res.data.forEach((item) => {
              this.$set(item, "isLeaf", !item.hasSons);
            });
            resolve(res.data);
      })
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
  },
  created() {},
  mounted() {
      this.getEduUnitList()
  },
};
</script>
<style lang='scss' scoped>
.tree-box {
  width: 210px;
  min-height: 100%;
  border-right: 1px solid #c9f0e1;
  margin-right: 28px;
}
</style>