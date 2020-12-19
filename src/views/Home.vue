<template>
  <div>
    <el-container dircetion="vertical">
      <el-header>
        <h1>在线直播教学平台</h1>
      </el-header>
      <el-main>
        <div v-if="this.$store.state.loginInfo.isLoggedIn">
          <LiveRoom></LiveRoom>
        </div>
        <div v-if="!this.$store.state.loginInfo.isLoggedIn">
          <p>欢迎来到在线教育直播平台，请先登录再选择课程！</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import LiveRoom from "@/components/LiveRoom";

export default {
  components: {
    LiveRoom,
  },
};
</script>
<style>
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
  width: 100%;
}
</style>
