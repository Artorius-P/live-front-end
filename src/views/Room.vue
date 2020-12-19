<template>
  <div>
    <div v-if="this.$store.state.loginInfo.isLoggedIn">
      <el-header>
        <h1>当前课程：{{ this.$store.state.room.name }}</h1>
      </el-header>
      <el-main>
        <live></live>
        <el-row>
          <br />
        </el-row>
        <el-row>
          <el-button
            @click="whiteBoard = true"
            icon="el-icon-edit"
            style="margin-left: 16px"
            plain
          >
            白板
          </el-button>
          <el-button
            @click="showchat"
            icon="el-icon-chat-round"
            style="margin-left: 16px"
            plain
          >
            聊天
          </el-button>
        </el-row>
        <el-drawer
          title="聊天室"
          :visible.sync="this.$store.state.chat"
          direction="rtl"
          :before-close="chatClose"
        >
          <chatPage></chatPage>
        </el-drawer>

        <el-drawer
          title="白板"
          :visible.sync="whiteBoard"
          direction="ttb"
          size="100%"
        >
          <boardPage></boardPage>
        </el-drawer>
      </el-main>
    </div>

    <div v-if="!this.$store.state.loginInfo.isLoggedIn">
      <notLogin></notLogin>
    </div>
  </div>
</template>

<script>
import notLogin from "@/components/NotLogin";
import live from "@/components/Live";
import chatPage from "@/components/Chat";
import boardPage from "@/components/WhiteBoard";

export default {
  data() {
    return {
      whiteBoard: false,
    };
  },
  components: {
    notLogin,
    live,
    chatPage,
    boardPage,
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