<template>
  <div class="outerBox">
    <!-- 导航栏区域 -->
    <ul class="nav">
      
    </ul>
    <!-- 右侧内容区 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang='less' rel='stylesheet/less' scoped>
.outerBox {
  width: 100%;
  height: 100%;
  display: flex;
  // 导航栏
  .nav {
    width: 18%;
    background-color: rgb(50 ,65 ,87);
  }

  // 内容区域
  .content {
    background-color: pink;
    flex: 1;
  }
}

</style>
