<template>
  <div class="u-height">
    <view-box ref="viewBox" body-padding-bottom="0">
      <section class="songBg u-height">
        <div class="bg" :style="{backgroundImage: 'url(' + audio.albumPic + ')'}"></div>
        <!-- 标题 -->
        <div class="title vux-1px-b">
          <div class="left" @click="back">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-navigatebefore"></use>
            </svg>
          </div>
          <div class="middle">
            <p>{{audio.name}}</p>
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
          <div class="img" v-show="!showLyric" @click="toggleStatus">
            <div class="circle">
              <div
                class="pic"
                :class="{circling:playing}"
                :style="{backgroundImage: 'url(' + audio.albumPic + ')'}"
              >
                <span class="block" :class="{pause:!playing}"></span>
              </div>
              <canvas class="canvas" :style="{'top':top}"></canvas>
            </div>

            <canvasCircle ref="canvas" class="canvas" v-if="false"></canvasCircle>
          </div>
          <div class="userdo" v-show="!showLyric">
            <div class="item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-favorite"></use>
              </svg>
            </div>
            <div class="item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-filedownload"></use>
              </svg>
            </div>
            <div class="item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-modecomment"></use>
              </svg>
            </div>
            <div class="item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-unfoldmore"></use>
              </svg>
            </div>
          </div>
          <!-- 歌词 -->
          <div class="lrc" @click="toggleStatus" v-show="showLyric">
            <scroll class="wrapper" ref="scroll">
              <div class="lrc-content content">
                <div class="lrc-box">
                  <p
                    class="lrc-list"
                    :class="{'lrc-select':item.show}"
                    v-for="(item, index) in lycObj.lines"
                    :key="index"
                  >{{item.txt}}</p>
                </div>
              </div>
            </scroll>
          </div>
        </div>
        <div class="playBar">
          <musicProgress></musicProgress>
          <!-- 操作区域 -->
          <div class="playitem">
            <div class="child" >
              <svg class="icon" aria-hidden="true" @click="switchType">
                <use :xlink:href="playtype"></use>
              </svg>
            </div>
            <div class="child" @click="prev">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-skipprevious"></use>
              </svg>
            </div>
            <div class="child" @click="togglePlay">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="PlayOrPause"></use>
              </svg>
            </div>
            <div class="child" @click="next">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-skipnext"></use>
              </svg>
            </div>
            <div class="child">
              <svg class="icon" aria-hidden="true" @click="showList = true">
                <use xlink:href="#icon-formatlistbulleted"></use>
              </svg>
            </div>
          </div>
          <songlistModal v-model="showList" @cb="showList = false"></songlistModal>
        </div>
      </section>
    </view-box>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { ViewBox, Actionsheet } from "vux";
import Lyric from "lyric-parser";
import scroll from "@/components/scroll";
import canvasCircle from "@/components/anime/canvasCircle";
import musicProgress from "@/components/audio/progress";
import songlistModal from "./songlistModal";
import Circle from "@/components/anime/circle";
import { setInterval, clearInterval } from "timers";
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
      pullUpLoadObj: false,
      //modal
      showList: false,
      menus1: [{ menu1: "删除" }, { menu1: "删除" }, { menu1: "删除" }]
    };
  },
  props: {
    id: {
      default: 449824917
    }
  },
  watch: {
    currentTime(v) {
      //canvas
      let currentTime = v;
      let duration = this.durationTime;
      let percent = currentTime / duration;
      if (percent == 1) {
        percent = 0; //当播放完成，进度条跳到开始
      }
      //this.$refs.canvas.drawMain(percent, "#bd2523", "#888", 130, currentTime);
      //lyric
      let Lyric = this.lycObj.lines;
      if (Lyric === undefined) {
        return;
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
        //console.log(error);
      }
    }
  },
  components: {
    ViewBox,
    scroll,
    canvasCircle,
    musicProgress,
    Actionsheet,
    songlistModal
  },
  computed: {
    top() {
      return (417 - 375) / 2 + "px";
    },
    playtype(){
      const obj = {
        1:'#icon-repeatone',
        2:'#icon-repeat',
        3:'#icon-swaphoriz'
      }
      return obj[this.playType]
    },
    PlayOrPause() {
      return this.playing ? "#icon-playarrow" : "#icon-pause";
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
        //console.log(lineNum, txt);
        this.txt = lineNum + txt;
      });
      //console.log(this.lycObj);
    }, 1000);
    this.$root.$el.style.paddingBottom = 0;
    this.createCanvas();
  },
  beforeDestroy() {
    this.canvas = null;
  },
  methods: {
    ...mapMutations("music", [
      "play",
      "pause",
      "setcurrentTime",
      "setdurationTime",
      "prev",
      "next",
      'switchType'
    ]),
    createCanvas() {
      this.time = setInterval(() => {
        if (document.querySelector(".canvas")) {
          this.canvas = new Circle(".canvas");
          clearInterval(this.time);
        }
      }, 1000);
    },
    toggleStatus() {
      this.showLyric = !this.showLyric;
    },
    togglePlay() {
      this.canvas.switch(!this.playing);
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    back() {
      this.$router.back();
    },
    init() {
      const play = document.querySelector("#audioPlay");
      play.addEventListener("timeupdate", () => {});
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
    border-color: #fff;
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
      padding: 0;
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
      width: 100%;
      //overflow: hidden;
      position: relative;
      margin: 0 auto;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      .canvas {
        position: absolute;
        width: 375px;
        height: 375px;
        left: 50%;
        top: 0;
        z-index: 999;
        transform: translateX(-50%);
      }
      // &:after {
      //   display: block;
      //   position: absolute;
      //   left: 55%;
      //   top: 0px;
      //   content: "";
      //   width: 100px;
      //   height: 120px;
      //   background: url("../../assets/play/needle-ip6.png") center/contain
      //     no-repeat;
      // }
      .circle {
        height: 300px;
        //background: url("../../assets/play/disc-ip6.png") center/contain no-repeat;
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
          flex: 0 0 60%;
          height: 60%;
          padding-bottom: 60%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 100%;
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
        color: #ffffff;
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
        color: #fff;
        &:nth-child(3) {
          font-size: 50px;
        }
      }
    }
  }
}
</style>
