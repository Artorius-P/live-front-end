<template>
  <div>
  <p>请点击下方按钮选择直播课程</p>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="课程ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="课程名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="teacher"
      label="授课教师"
      width="120">
    </el-table-column>
    <el-table-column
      prop="profile"
      label="课程简介">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">进入课程</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);

      }
    },

    data() {
      return {
        tableData: [{
            name: "综合项目实践",
            teacher: "teacher",
            profile: "2020年秋学期",
            id: 1
        }]
      }
    },
  }
</script>