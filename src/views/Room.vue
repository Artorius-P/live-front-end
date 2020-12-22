<template>
  <div>
    <div v-if="this.$store.state.loginInfo.isLoggedIn">
      <el-header>
        <h1>当前课程：{{ this.$store.state.room.name }}</h1>
      </el-header>
      <el-main>
        <live></live>
        <vue-webrtc ref="webrtc"
                      width="100%"
                      :roomId="roomId"
                      @error="onError" />
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
          <el-button v-if="isStu"
            @click="talk"
            icon="el-icon-chat-round"
            style="margin-left: 16px"
            plain
          >
            连麦
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
      isStu: false,
      roomId: null,
      img: null
    };
  },
  mounted(){
    if(this.$store.state.loginInfo.identity == '0') {
      this.isStu =true
      this.roomId = this.$store.state.room.id;
      }
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
    talk() {
      this.img = this.$refs.webrtc.shareScreen();
    }
  },
  computed: {},
};
</script>