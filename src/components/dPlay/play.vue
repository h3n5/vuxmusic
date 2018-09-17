<template>
    <div class="u-height">
    <view-box ref="viewBox" body-padding-bottom="0">
        <section class="songBg u-height" >
            <div class="bg" :style="{backgroundImage: 'url(' + audio.albumPic + ')'}"></div>
            <!-- 标题 -->
            <div class="title">
                <div class="left" @click="back">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-left"></use>
                            </svg>
                </div>
                <div class="middle">
                    <p>{{audio.name}}</p>
                    <p>{{audio.singer}}</p>
                </div>
                <div class="right">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-fenxiang"></use>
                            </svg>
                </div>
            </div>
            <!-- 模糊背景 -->
            <div class="song">
                <!-- 播放 -->
                <div class="img" v-show="!showLyric">
                    <div class="circle" @click="toggleStatus">
                        <div class="pic" :class="{circling:playing}" :style="{backgroundImage: 'url(' + audio.albumPic + ')'}" >
                            <span class="block" :class="{pause:!playing}" ></span>
                        </div>
                    </div>
                    <div class="audio">
                        <audio :src="audio.location" @timeupdate="updateTime" @canplay="canPlaySong"  @ended="next" id="audioPlay"></audio>
                    </div>
                </div>
                <div class="userdo" v-show="!showLyric">
                    <div class="item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-custom-tolove-copy"></use>
                            </svg>
                    </div>
                    <div class="item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-41download"></use>
                            </svg>
                    </div>
                    <div class="item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-message"></use>
                            </svg>
                    </div>
                    <div class="item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-list"></use>
                            </svg>
                    </div>
                </div>
                <!-- 歌词 -->
                <div class="lrc" @click="toggleStatus" v-show="showLyric">
                <scroll class="wrapper"
                        ref="scroll"
                        :scrollbar="scrollbarObj"
                        :pullDownRefresh="pullDownRefreshObj"
                        :pullUpLoad="pullUpLoadObj"     
                        :startY="parseInt(startY)"
                        >
                
                    <div class="lrc-content content">
                        <div class="lrc-box">
                            <p class="lrc-list" :class="{'lrc-select':item.show}" v-for="(item, index) in lycObj.lines" :key="index">{{item.txt}}</p>
                        </div>
                    </div>
                </scroll>
                 </div>
            </div>
            <div class="playBar">
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
                    <div class="playitem">
                        <div class="child">   
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-MP"></use>
                            </svg>
                        </div>
                        <div class="child">   
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiayishou"></use>
                            </svg>
                        </div>
                        <div class="child" @click="togglePlay">   
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="PlayOrPause"></use>
                            </svg>
                        </div>
                        <div class="child">   
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiayishou"></use>
                            </svg>
                        </div>
                        <div class="child">   
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-liushengji"></use>
                            </svg>
                        </div>
                    </div>
            </div>
        </section>
    </view-box>
    </div>
</template>
<script>
// import api from "@/api/index";
import { mapMutations, mapState } from "vuex";
import { ViewBox } from "vux";
import Lyric from "lyric-parser";
import scroll from "@/components/scroll";
let audio = {
  id: 449824917,
  name: "WHITE ALBUM",
  singer: "冬馬かずさ",
  albumPic:
    "http://p1.music.126.net/xS5fvWgXpN0pawnAi012zA==/18587244069265999.jpg",
  location:
    "http://m10.music.126.net/20180914121021/9ddee6b95a49212668be0846bcaf6015/ymusic/35dc/ccbc/c7e9/5fe13de96ac98c1a5f15dae8d66287d7.mp3",
  album: "WHITE ALBUM2 ORIGINAL SOUNDTRACK～kazusa～"
};
export default {
  name: "play",
  data() {
    return {
      song: { description: "", tags: [] },
      creator: {},
      lrc: [],
      showLyric: false,
      percent: 90,
      duration: 600,
      lycObj: {},
      scrollbarObj: false,
      startY: 200,
      pullDownRefreshObj: false,
      pullUpLoadObj: false
    };
  },
  props: {
    id: {
      type: Number,
      default: 449824917
    }
  },
  filters: {
    dateFormat(value) {
      let left =
        parseInt(value / 60) < 10
          ? "0" + parseInt(value / 60)
          : parseInt(value / 60);
      let right = value % 60 < 10 ? "0" + value % 60 : value % 60;
      return left + ":" + right;
    }
  },
  watch: {
    currentTime(v) {
      let Lyric = this.lycObj.lines;
      if(Lyric === undefined){
        return
      }
      try {
        for (let [i, line] of new Map(Lyric.map((item, i) => [i, item]))) {
          line.show = false;
          if (line.time > v * 1000) {
            line.show = true;
            this.$refs.scroll.scrollTo(0, -i * 30 + 200);
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { ViewBox, scroll },
  computed: {
    indicatorPosition() {
      return this.currentTime / this.duration * 100;
    },
    PlayOrPause() {
      return this.playing ? "#icon-bofang" : "#icon-zanting";
    },
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
  created() {},
  mounted() {
    this.init();
    setTimeout(() => {
      this.lycObj = new Lyric(this.lyricTxt, ({ lineNum, txt }) => {
        console.log(lineNum, txt);
      });
      console.log(this.lycObj);
    }, 1000);

    this.toggleFoot();
    this.$root.$el.style.paddingBottom = 0;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    ...mapMutations("music", [
      "play",
      "pause",
      "setcurrentTime",
      "setdurationTime"
    ]),
    ...mapMutations("menu", ["toggleFoot"]),
    toggleStatus() {
      this.showLyric = !this.showLyric;
    },
    togglePlay() {
      if (this.playing) {
        document.getElementById("audioPlay").pause();
        this.pause();
      } else {
        document.getElementById("audioPlay").play();
        this.play();
      }
    },
    updateTime(e) {
      this.setcurrentTime(Math.round(e.target.currentTime));
    },
    canPlaySong(e) {
      // console.log(Math.floor(e.target.duration));
      this.play();
      this.setdurationTime(Math.round(e.target.duration));
      document.querySelector("#audioPlay").play();
    },
    next() {},
    back() {
      this.$router.push("/search");
    },
    init() {
      const play = document.querySelector("#audioPlay");
      play.addEventListener("timeupdate", e => {});
    }
  }
};
</script>
<style lang="less" scoped>
#app {
  padding: 0;
}
.u-height {
  height: 100%;
}
.songBg {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  .title {
    display: flex;
    flex-flow: row nowrap;
    padding: 5px 5px;
    color: #fff;
    border-bottom: 1px solid #fff;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      p {
        overflow: hidden;
      }
    }
    .left {
      flex-basis: 50px;
      font-size: 20px;
      padding: 5px;
    }
    .middle {
      flex: 1 1 auto;
      display: flex;
      flex-flow: column wrap;
      p {
        height: 20px;
        line-height: 20px;
        text-align: center;
        &:nth-child(2) {
          font-size: 12px;
        }
      }
    }
    .right {
      flex-basis: 50px;
      font-size: 20px;
    }
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(15px);
    background: rgb(0, 0, 0, 0.1);
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #999;
    // transform: scaleY(3);
    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .song {
    // background: url(/img/play/logo.png) center/200px auto no-repeat;
    display: flex;
    flex: 1 1 auto;
    flex-flow: column nowrap;
    background-position: 95% 20px;
    position: relative;
    .back {
      position: absolute;
      top: 20px;
      left: 10px;
      font-size: 14px;
      background: #222;
      opacity: 0.2;
      color: #ffffff;
      border-radius: 24px;
    }
    .img {
      width: 60%;
      overflow: hidden;
      position: relative;
      margin: 0 auto;
      flex: 1 1 auto;
      &:after {
        display: block;
        position: absolute;
        left: 55%;
        top: -10px;
        content: "";
        width: 100px;
        height: 150px;
        background: url("../../assets/play/needle-ip6.png") center/contain
          no-repeat;
      }
      .circle {
        height: 300px;
        background: url("../../assets/play/disc-ip6.png") center/contain
          no-repeat;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .circling {
          animation: circling 20s infinite linear;
        }
        @keyframes circling {
          form {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .pic {
          flex: 0 0 65%;
          height: 43%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          z-index: -1;
          .block {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
          }
          .pause {
            background: url(/img/play/play2.png) center/contain no-repeat;
          }
        }
      }
    }
    .userdo {
      display: flex;
      flex-basis: 60px;
      padding: 10px 0;
      margin: 15px 30px;
      .item {
        flex: 1;
        display: flex;
        font-size: 20px;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
    }
    .lrc {
      font-size: 14px;
      padding-top: 40px;
      color: #fefefe;
      text-align: center;
      height: 400px;
      .wrapper {
        height: 100%;
        // overflow: hidden;
        background: transparent;
      }
      .lrc-content {
        .lrc-box {
          .lrc-list {
            font-size: 14px;
            padding-bottom: 10px;
            color: hsla(0, 0%, 100%, 0.6);
          }
          .lrc-select {
            font-size: 16px;
            color: #ff2d55;
          }
          .lrc-now {
            font-size: 16px;
            color: #fefefe;
          }
        }
      }
    }
  }
  .playBar {
    display: flex;
    flex-basis: 120px;
    flex-direction: column;
    // position: fixed;
    // bottom: 0;
    width: 100%;
    .playitem {
      display: flex;
      padding: 10px 0;
      .child {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: 30px;
        padding: 10px 0;
        &:nth-child(2) {
          transform: rotate(180deg);
        }
        &:nth-child(3) {
          font-size: 50px;
        }
      }
    }
    .progress-bar-group {
      height: 30px;
      width: 100%;
    }
    .progress-bar-group .progress-bar {
      height: 4px;
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
      width: 2px;
      height: 12px;
      background: #ff2d55;
      top: -3px;
      margin: 0 50px;
      /*left: 20%;*/
    }
    .progress-bar-group .time-indicater {
      line-height: 16px;
      height: 16px;
      font-size: 12px;
      flex-basis: 50px;
    }
    .progress-bar-group .time-indicater span {
      padding: 0 10px;
    }
    .progress-bar-group .time-indicater span:last-child {
    }
  }
}
</style>
