<template>
  <div class="about">
    <h1>忘记密码</h1>
    <el-row type="flex" justify="center">
      <el-form ref="loginForm" :model="user" status-icon label-width="80px">
        <el-form-item prop="id" label="用户ID">
          <el-input
            v-model="user.id"
            placeholder="请输入用户ID"
            prefix-icon
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMail()" :loading="loading">{{
            sendWord
          }}</el-button>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input
            v-model="user.code"
            placeholder="请输入6位验证码"
            prefix-icon
          ></el-input>
        </el-form-item>
        <el-form-item id="password" prop="password" label="密码">
          <el-input
            v-model="user.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="confirmPassword"
          prop="confirmPassword"
          label="确认密码"
        >
          <el-input
            v-model="user.confirmPassword"
            show-password
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin()">重置密码</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "regist",
  data() {
    return {
      user: {
        id: "",
        code: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
      sendWord: "获取验证码",
    };
  },
  created() {},
  methods: {
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    sendMail() {
      if (!this.user.id) {
        this.$message.error("请输入用户id！");
        return;
      } else {
        axios
          .post("http://a.boynextdoor.top:5000/api/sendmail", {
            id: this.user.id,
          })
          .then((res) => {
            if (res.data.status === 1) {
              this.loading = true;
              this.sendWord = "按钮冷却中";
              this.$alert("验证码发送成功，请进入注册邮箱查看。", "发送成功", {
                confirmButtonText: "确定",
              });
              this.sleep(60000).then(() => {
                this.loading = false;
                this.sendWord = "获取验证码";
              });
            } else {
              this.$message.error("验证码发送失败，信息存在错误。");
            }
          });
      }
    },
    doLogin() {
      if (!this.user.id) {
        this.$message.error("请输入用户id！");
        return;
      } else if (!this.user.code) {
        this.$message.error("请输入验证码！");
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
          .post("http://a.boynextdoor.top:5000/api/reset", {
            id: this.user.id,
            code: this.user.code,
            password: this.user.password,
          })
          .then((res) => {
            if (res.data.status === 1) {
              this.$alert("密码修改成功，请牢记。", "修改成功", {
                confirmButtonText: "确定",
                callback: this.$router.push("/home"),
              });
            } else {
              this.$message.error("修改失败，信息存在错误。");
            }
          });
      }
    },
  },
};
</script>
 