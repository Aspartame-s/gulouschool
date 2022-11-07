<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in data" :key="index" @click.native="routeTo">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name: 'breadCrumb',
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    routeTo() {
      // const length = this.data.length
      const path = this.data[this.data.length - 1].path
      // console.log(path)
      this.$router.push({
        path
      })
    }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #11B07A;
}
/deep/ .el-breadcrumb {
    line-height: normal;
}
</style>