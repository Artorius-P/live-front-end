<template>
<div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
        
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="about">关于</el-menu-item>
        <el-menu-item >
            <el-button plain round @click="dialogVisible = true" >{{isLogined}}</el-button>
        </el-menu-item>
    </el-menu>

    <el-dialog title="登录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" >
        <LoginPage></LoginPage>
    </el-dialog>
    </div>
</template>
<script>
import LoginPage from "@/components/LoginPage"

    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                dialogVisible: false,
                isLogined: '登录',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        },
        components: {
            LoginPage
        }
    }
</script>  

<style scoped>
.login-button {
  width: 80%;
  margin-left: -75px;
}
</style>