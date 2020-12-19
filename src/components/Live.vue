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
    };
  },
  mounted() {
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
  },
};
</script>