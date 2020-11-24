<template>
  <div class="outerBox">
    <!-- 导航栏区域 -->
    <ul class="nav"></ul>
    <!-- 右侧内容区 -->
    <div class="content">
      <!-- 面包屑导航栏 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">数据管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import index from "./pages/userList/index.vue";
import Home from "./pages/Home";
export default {
  name: "App",
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.outerBox {
  width: 100%;
  height: 100%;
  display: flex;
  // 导航栏
  .nav {
    width: 18%;
    background-color: rgb(50, 65, 87);
  }

  // 内容区域
  .content {
    background-color: rgb(252, 250, 250);
    flex: 1;
  }
}
</style>
