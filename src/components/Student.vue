<template>
  <div>
    <div v-if="this.$store.state.loginInfo.isLoggedIn">
      <el-header> </el-header>
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
          <el-button
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
      <el-footer v-if="isConnected" style="text-align: center">
        <div>
          <el-select v-model="videoValue" placeholder="请选择视频源">
            <el-option
              v-for="item in videos"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-select v-model="audioValue" placeholder="请选择音频源">
            <el-option
              v-for="item in audios"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="teacherPlay">开始推流</el-button>
        </div>
      </el-footer>
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
      roomId: null,
      img: null,
      isConnected: false,
      videos: [],
      videoValue: "",
      audios: [],
      audioValue: "",
    };
  },
  mounted() {
    this.roomId =  this.$store.state.room.id;
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
      if (!this.isConnected) {
        this.$axios
          .get("http://127.0.0.1:8086/device")
          .then((response) => {
            this.videos = response.data.video;
            this.audios = response.data.audio;
          })
          .catch((error) => {
            this.$message.error(error);
          });
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
  },
  computed: {},
};
</script>