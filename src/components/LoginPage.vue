<template>
    <div>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user"  status-icon label-width="80px">
          <el-form-item prop="id" label="用户ID">
            <el-input v-model="user.id" placeholder="请输入用户ID" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-link href="/forget" :underline="false">忘记密码？</el-link>
          <el-link href="/regist"  :underline="false">注册账号</el-link>
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
        id: "",
        password: ""
      }  
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.id) {
        this.$message.error("请输入用户ID！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        //校验用户名和密码是否正确;
        // this.$router.push({ path: "/personal" });
        axios
          .post("http://127.0.0.1:5000/api/login", {
            id: this.user.id,
            password: this.user.password
          })
          .then(res => {
            console.log("输出response.data.status", res.data);
            if (res.data.status === 1) {
              this.$store.state.loginInfo = {
                isLoggedIn: true,
                token: res.data.token,
                id: res.data.id,
                username: res.data.username,
                identity: res.data.identity,
                mail: res.data.mail
              };
              this.$store.state.loginVisible = false;
              this.$message.success(res.data.username +' 登录成功');
            } else {
              this.$message.error('用户ID或密码错误！');
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