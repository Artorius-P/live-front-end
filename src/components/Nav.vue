<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
    >
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="about">关于</el-menu-item>
      <el-menu-item>
        <el-button plain round @click="loginButton">{{ loginWord }}</el-button>
      </el-menu-item>
    </el-menu>

    <el-dialog
      title="登录"
      :visible.sync="this.$store.state.loginVisible"
      width="30%"
      :before-close="handleClose"
    >
      <LoginPage></LoginPage>
    </el-dialog>
  </div>
</template>
<script>
import LoginPage from "@/components/LoginPage";

export default {
  data() {
    return {
      activeIndex: "home",
    };
  },
  computed: {
    loginWord() {
      if (this.$store.state.loginInfo.isLoggedIn) {
        return this.$store.state.loginInfo.username;
      } else {
        return "登录";
      }
    },
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose () {
        this.$store.state.loginVisible = false;
    },
    loginButton() {
      if (this.$store.state.loginInfo.isLoggedIn) {
          let identity = ''
        if (this.$store.state.loginInfo.identity) {
            identity = '教师';
        }
        else {
            identity = '学生';
        }
        let msg = [this.$createElement('p', null, "ID:" + this.$store.state.loginInfo.id),
          this.$createElement('p', null,"用户名:" + this.$store.state.loginInfo.username),
          this.$createElement('p', null, "身份:" + identity),
          this.$createElement('p', null, "邮箱:" + this.$store.state.loginInfo.mail)];
        this.$confirm(this.$createElement('div',null, msg), "用户信息", {
        confirmButtonText: "退出登录",
        cancelButtonText: '取消',
        type: 'successs',}).then(() => {
        this.$message({
            type: 'warning',
            message: '您已退出登录。'
        });
        this.$store.state.loginInfo = {
            isLoggedIn: false,
            token: null,
            id: null,
            username: null,
            identity: null,
            mail: null
        }
        })
            // .catch(() => {
            // this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            // });          
            // });
            
      } else {
        this.$store.state.loginVisible = true;
      }
    },
  },
  components: {
    LoginPage,
  },
};
</script>  

<style scoped>
.login-button {
  width: 80%;
  margin-left: -75px;
}
</style>