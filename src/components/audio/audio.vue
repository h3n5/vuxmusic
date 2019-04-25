<template>
    <audio
      ref="audio"
      :src="audio.location"
      @timeupdate="updateTime"
      @canplay="canPlaySong"
      @ended="next"
      id="audioPlay"
      :loop="playType === 3"
    ></audio>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "AudioPlay",
  computed: {
    ...mapState("music", [
      "audio",
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
      "prCurrentTime",
      "isCurrentTime"
    ])
  },
  methods: {
    ...mapMutations("music", [
      "play",
      "pause",
      "setcurrentTime",
      "setdurationTime",
      "setAudio"
    ]),
    ...mapActions("music", ["getListPlay"]),
    updateTime(e) {
      if (this.isCurrentTime) {
        this.setcurrentTime(e.target.currentTime);
      }
    },
    canPlaySong(e) {
      this.setdurationTime(e.target.duration);
    },
    next() {
      // 1,歌单循环;2,歌单随机;3,单曲循环
      let type = this.playType;
      if (type === 1) {
        this.currentIndex === this.songList.length - 1
          ? (this.currentIndex = 0)
          : this.currentIndex++;
          this.getListPlay();
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
        this.getListPlay();
      }
    }
  }
};
</script>

<style lang='less' scoped>
</style>
