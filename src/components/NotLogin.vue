<template>
    <el-header>
        <h1>请先登录!</h1>
    </el-header>
</template>

<script>
export default {
    mounted: function() {
        this.$router.push('/home')   
      }
}
</script>