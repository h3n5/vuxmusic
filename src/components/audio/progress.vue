<template>
    <div class="progress-bar-group">
        <div class="progress-bar">
        <div class="time-indicater">
            <span>{{currentTime | dateFormat }}</span>
        </div>
        <div class="progress" :style="{width:indicatorPosition+'%'}"></div>
        <div class="time-indicater">
        <span>{{durationTime | dateFormat }}</span>
        </div>
            <div class="indicater" :style="{left:indicatorPosition+'%'}"></div>
        </div>
    </div>
</template>

<script>
import {  mapState } from "vuex";
export default {
name: '',
components:{},
data () {
    return {
    }
  },
computed:{
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
    ]),
    indicatorPosition() {
      return (this.currentTime / this.durationTime) * 100;
    },
},
filters: {
  dateFormat(value) {
    let left =
      parseInt(value / 60) < 10
        ? "0" + parseInt(value / 60)
        : parseInt(value / 60);
    let right = value % 60 < 10 ? "0" + (value % 60) : value % 60;
    return left + ":" + right;
  }
},
methods: {}
}
</script>

<style lang='less' scoped>
.progress-bar-group {
  height: 30px;
  width: 100%;
}
.progress-bar-group .progress-bar {
  height: 2px;
  // background: #cccccc;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.progress-bar-group .progress-bar .progress {
  height: 100%;
  background: #7f7f7f;
  flex: 1 1 auto;
  /*width: 20%;*/
}
.progress-bar-group .progress-bar .indicater {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: #ff2d55;
  top: -6px;
}
.progress-bar-group .time-indicater {
  line-height: 16px;
  height: 16px;
  font-size: 12px;
  flex-basis: 50px;
  color: #fff;
}
.progress-bar-group .time-indicater span {
  padding: 0 10px;
}
.progress-bar-group .time-indicater span:last-child {
}
</style>
