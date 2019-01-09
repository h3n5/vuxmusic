<template>
    <div class="progress-bar-group">
        <div class="time-indicater">
            <span>{{currentTime | dateFormat }}</span>
        </div>
        <div class="progress" :style="{width:indicatorPosition+'%'}">
          <div class="indicater" :style="{left:indicatorPosition+'%'}"></div>
        </div>
        <div class="time-indicater">
          <span>{{durationTime | dateFormat }}</span>
        </div>
    </div>
</template>

<script>
import {  mapState } from "vuex";
export default {
name: 'indicater',
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
methods: {
}
}
</script>

<style lang='less' scoped>
.progress-bar-group {
  height: 30px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .time-indicater{
    line-height: 30px;
    height: 30px;
    font-size: 12px;
    flex-basis: 50px;
    color: #fff;
    span{
      padding: 0 10px;
    }
  }
  .progress{
    height: 2px;
    background: #f1f1f1;
    flex: 1 1 auto;
    position: relative;
    box-sizing: border-box;
    .indicater{
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 16px;
      background: #f1f1f1;
      top: -7px;
      &::after{
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 4px;
        background: #999;
        top: 6px;
        left: 6px;
        position: absolute;
      }
    }
  }
}
</style>
