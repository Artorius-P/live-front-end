<template>
  <div>
    <h1>注册用户</h1>
      <el-alert
      title="注册仅支持学生身份，教师注册请联系管理员"
      type="success">
      </el-alert>
     <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user"  status-icon label-width="80px">
          <el-form-item prop="name" label="用户名">
            <el-input v-model="user.name" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item id="confirmPassword" prop="confirmPassword" label="确认密码">
            <el-input v-model="user.confirmPassword" show-password placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="doLogin()">注 册</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "regist",
  data() {
    return {
      user: {
        name: "",
        password: "",
        confirmPassword: ""
      }  
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.name) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else if (this.user.password != this.user.confirmPassword) {
        this.$message.error("两次密码不匹配！");
        return;
      } else {
        //校验用户名和密码是否正确;
        // this.$router.push({ path: "/personal" });
        axios
          .post("http://localhost:5000/api/regist", {
            name: this.user.name,
            password: this.user.password
          })
          .then(res => {
            if (res.data.status === 1) {
              this.$alert('您的用户ID为:' + res.data.uid + '，请牢记。', '注册成功', {
                confirmButtonText: '确定',
                callback: this.$router.push('/home')
              })
            } else {
              this.$message.error('注册失败');
            }
          });
      }
    }
  }
};
</script>
 

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