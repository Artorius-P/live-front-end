<template>
  <div>
    <video id="videoElement" controls autoplay width="512" height="288"></video>
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
      roomID: null,
    };
  },
  mounted() {
    this.roomID = this.$store.state.room.id;
    if (this.$store.state.loginInfo.identity == "1") {
      this.isTeacher = true;
    }
    if (flvjs.isSupported()) {
      let liveUrl = "http://a.boynextdoor.top/srs/live/" + this.roomID + ".flv";
      if (this.isTeacher) {
        liveUrl = "http://a.boynextdoor.top/stu" + this.roomID + ".flv";
      }
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
    teacherPlay() {
      let videoUrl = "rtmp://a.boynextdoor.top:1935/live/" + this.roomID
      if (!this.isTeacher) {
        videoUrl = "rtmp://a.boynextdoor.top:1935/live/stu" + this.roomID
      }
      this.$axios
        .post("http://127.0.0.1:8086/play", {
          audio: this.audioValue,
          video: this.videoValue,
          url: videoUrl,
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
};
</script>