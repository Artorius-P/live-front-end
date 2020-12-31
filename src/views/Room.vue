<template>
  <div>
    <div v-if="this.$store.state.loginInfo.isLoggedIn">
      <el-header>
        <h1>当前课程：{{ this.$store.state.room.name }}</h1>
      </el-header>
      <studentPage v-if="isStu"></studentPage>
      <teacherPage v-else></teacherPage>
      <div v-if="!this.$store.state.loginInfo.isLoggedIn">
        <notLogin></notLogin>
      </div>
    </div>
  </div>
</template>

<script>
import notLogin from "@/components/NotLogin";
import live from "@/components/Live";
import chatPage from "@/components/Chat";
import boardPage from "@/components/WhiteBoard";
import studentPage from "@/components/Student";
import teacherPage from "@/components/Teacher";

export default {
  data() {
    return {
      whiteBoard: false,
      isStu: false,
      img: null,
      isConnected: false,
    };
  },
  mounted() {
    if (this.$store.state.loginInfo.identity == "0") {
      this.isStu = true;
    }
  },
  components: {
    notLogin,
    live,
    chatPage,
    boardPage,
    studentPage,
    teacherPage,
  },
  methods: {
    showchat() {
      this.$store.state.chat = true;
    },
    chatClose() {
      this.$store.state.chat = false;
    },
  },
  computed: {},
};
</script>