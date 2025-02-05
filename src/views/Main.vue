<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside/>
      <el-container class="r-container">
        <common-header/>
        <common-tag />
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTag from "../components/CommonTag.vue";
export default defineComponent({
  commonets: {
    CommonHeader,
    CommonAside,
    CommonTag
  }
});
</script>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
}
.common-layout {
  .lay-container {
    flex-wrap: nowrap;
  }
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}
</style>


