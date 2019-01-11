<template>
  <div>
    <audio
      ref="audio"
      :src="audio.location"
      @timeupdate="updateTime"
      @canplay="canPlaySong"
      @ended="next"
      id="audioPlay"
      :loop="playType === 3"
    ></audio>
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
      this.getListPlay()
    }
  },
  methods: {
    ...mapMutations("music", [
      "play",
      "pause",
      "setcurrentTime",
      "setdurationTime",
      "setAudio",
      "getListPlay"
    ]),
    updateTime(e) {
      this.setcurrentTime(Math.round(e.target.currentTime));
    },
    canPlaySong(e) {
      this.play();
      this.setdurationTime(Math.round(e.target.duration));
    },
    next() {
      // 1,歌单循环;2,歌单随机;3,单曲循环
      let type = this.playType;
      if (type === 1) {
        this.currentIndex === this.songList.length - 1
          ? (this.currentIndex = 0)
          : this.currentIndex++;
      }
      if (type === 2) {
        var randomIndex = () => {
          var r = ~~((this.songList.length - 1) * Math.random());
          if (r === this.currentIndex) {
            r = randomIndex();
          }
          return r;
        };
        this.currentIndex = randomIndex();
      }
      if (type === 3) {
        this.currentIndex = this.currentIndex;
      }
    }
  }
};
</script>

<style lang='less' scoped>
</style>
