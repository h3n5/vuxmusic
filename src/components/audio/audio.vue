<template>
  <div>
    <audio ref="audio" :src="audio.location" @timeupdate="updateTime" @canplay="canPlaySong"  @ended="next" id="audioPlay" :loop="playType === 3"></audio>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("music", [
      "audio",
      "lyricTxt",
      "change",
      "playing",
      "loading",
      "songList",
      "playType",
      "currentTime",
      "currentIndex",
      "prBufferedTime",
      "tmpCurrentTime",
      "durationTime",
      "prCurrentTime"
    ])
  },
  watch:{
    currentIndex(){
      this.setAudio()
    }
  },
  methods: {
    ...mapMutations("music", [
      "play",
      "pause",
      "setcurrentTime",
      "setdurationTime",
      'setAudio'
    ]),
    updateTime(e) {
      this.setcurrentTime(Math.round(e.target.currentTime));


    },
    canPlaySong(e) {
      this.play();
      this.setdurationTime(Math.round(e.target.duration));
    },
    next(e) {
      console.log(e);
    },
  }
};
</script>

<style lang='less' scoped>
</style>
