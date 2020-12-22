<template>
  <div>
    <video id="videoElement" controls autoplay width="512" height="288"></video>
    <div v-if="isTeacher">
      <el-footer style="text-align: center;">
      <el-select v-model="videoValue" placeholder="请选择视频源">
        <el-option
          v-for="item in videos"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="audioValue" placeholder="请选择音频源">
        <el-option
          v-for="item in audios"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    <el-button type="primary" @click="teacherPlay">开始推流</el-button>
    </el-footer>
    </div>
  </div>
</template>

<script>
import flvjs from "flv.js";

export default {
  name: "list",
  data() {
    return {
      flvPlayer: null,
      isTeacher: false,
      videos: [],
      videoValue: '',
      audios: [],
      audioValue: '',
    };
  },
  mounted() {
    if(this.$store.state.loginInfo.identity == '1') {
      this.isTeacher =true
      this.$axios.get('http://127.0.0.1:8086/device').then((response) => {
      this.videos = response.data.video
      this.audios = response.data.audio
    }).catch((error) => {
          this.$message.error(error)
        })
    }
    if (flvjs.isSupported()) {
      let liveUrl =
        "http://a.boynextdoor.top/srs/live/" +
        this.$store.state.room.id +
        ".flv";
      var videoElement = document.getElementById("videoElement");
      this.flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: liveUrl,
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
    }
  },
  methods: {
    play() {
      this.flvPlayer.play();
      
    },
    teacherPlay () {
      this.$axios.post('http://127.0.0.1:8086/play', {
            audio: this.audioValue,
            video: this.videoValue,
            url: 'rtmp://a.boynextdoor.top:1935/live/'+ this.$store.state.room.id
          }).then((res) => {
            console.log(res.data)
          })
      }
  },
};
</script>