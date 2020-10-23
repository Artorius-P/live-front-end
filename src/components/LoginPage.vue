<template>
    <div>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-link href="/forget" target="_blank" :underline="false">忘记密码？</el-link>
          <el-link href="/regist" target="_blank" :underline="false">注册账号</el-link>
          <el-form-item>
            <el-button type="primary"  @click="doLogin()">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }  
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        //校验用户名和密码是否正确;
        // this.$router.push({ path: "/personal" });
        axios
          .post("/api/login", {
            name: this.user.username,
            password: this.user.password
          })
          .then(res => {
            // console.log("输出response.data.status", res.data.status);
            if (res.data.status === 200) {
              this.$router.push({ path: "/home" });
            } else {
              alert("您输入的用户名或密码错误！");
            }
          });
      }
    }
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-wrap {
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}
#password {
  margin-bottom: 5px;
}

.el-button {
  width: 80%;
  margin-left: -75px;
}
</style>