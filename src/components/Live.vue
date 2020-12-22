<template>
  <div>
    <video id="videoElement" controls autoplay width="512" height="288"></video>
    <div v-if="isTeacher">
      <el-footer style="text-align: center;">
    <el-input v-model="room" placeholder="请输入房间号" style="width:200px"></el-input>
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
    <el-button type="primary" @click="lay">开始推流</el-button>
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
      let liveUrl = 'http://a.boynextdoor.top/srs/live/'+ this.room +'.flv'
      this.$axios.post('http://127.0.0.1:8086/play', {
            audio: this.audioValue,
            video: this.videoValue,
            url: 'rtmp://a.boynextdoor.top:1935/live/'+ this.room 
          }).then((res) => {
            console.log(res.data)
          })
      if (flvjs.isSupported()) {
      // 这里通过在本地开启一个flask作为restful API， 通过本地交互开启推流。
      var videoElement = document.getElementById('videoElement')
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: liveUrl
      });
      this.flvPlayer.attachMediaElement(videoElement)
      this.flvPlayer.load()
      }
        this.flvPlayer.play()
    }
  },
};
</script>