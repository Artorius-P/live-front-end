<template>
  <div>
    <p>查询到您的课程列表如下：</p>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      :on-loading="getData"
    >
      <el-table-column prop="id" label="课程ID" width="120"> </el-table-column>
      <el-table-column prop="name" label="课程名称" width="120">
      </el-table-column>
      <el-table-column prop="teacher" label="授课教师" width="120">
      </el-table-column>
      <el-table-column prop="tid" label="授课教师ID" width="120">
      </el-table-column>
      <el-table-column prop="profile" label="课程简介"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >进入课程</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    handleClick(row) {
      this.$store.state.room = row;
      this.$router.push("/room").catch(() => {});
    },

    getData() {
      if (this.$store.state.loginInfo.isLoggedIn) {
        this.loading = true;
        axios
          .get("http://127.0.0.1:5000/api/getRoom", {
            headers: {
              Authorization: `Token ${this.$store.state.loginInfo.token}`,
            },
          })
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((error) => {
            this.$message.error(error);
          });
      } else {
        this.$message.error("请先登录！");
      }
      this.loading = false;
    },
  },

  data() {
    return {
      tableData: [],
      loading: false,
    };
  },
  mounted: function () {
    this.tableData = [];
    this.getData();
  },
};
</script>