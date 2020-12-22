<template>
  <div id="app">
    <el-container>
      <el-header>
        <div>
          <Nav></Nav>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Copyright © Artorius 2020 - Present</el-footer
      >
    </el-container>
  </div>
</template>

<script>
import Nav from "./components/Nav";
export default {
  name: "app",
  components: {
    Nav,
  },
  created() {
    let loading = document.getElementById("loader-wrapper");
    if (loading != null) {
      document.body.removeChild(loading);
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
