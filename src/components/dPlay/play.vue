<template>
  <div class="u-height">
    <view-box
      ref="viewBox"
      body-padding-bottom="0"
    >
      <section class="songBg u-height">
        <div
          class="bg"
          :style="{backgroundImage: 'url(' + audio.albumPic + ')'}"
        ></div>
        <!-- 标题 -->
        <div class="title vux-1px-b">
          <div
            class="left"
            @click="back"
          >
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-navigatebefore"></use>
            </svg>
          </div>
          <div class="middle">
            <p>{{audio.name}}</p>
          </div>
          <div class="right">
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-fenxiang"></use>
            </svg>
          </div>
        </div>
        <!-- 模糊背景 -->
        <div class="song">
          <!-- 播放 -->
          <div
            class="img"
            v-show="!showLyric"
            @click="toggleStatus"
          >
            <div class="circle">
              <div
                class="pic"
                :class="{circling:playing}"
                :style="{backgroundImage: 'url(' + audio.albumPic + ')'}"
              >
                <span
                  class="block"
                  :class="{pause:!playing}"
                ></span>
              </div>
              <canvas
                class="canvas"
                :style="{'top':top}"
              ></canvas>
            </div>

            <canvasCircle
              ref="canvas"
              class="canvas"
              v-if="false"
            ></canvasCircle>
          </div>
          <div
            class="userdo"
            v-show="!showLyric"
          >
            <div class="item">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-favorite"></use>
              </svg>
            </div>
            <div class="item">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-filedownload"></use>
              </svg>
            </div>
            <div class="item">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-modecomment"></use>
              </svg>
            </div>
            <div class="item">
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-unfoldmore"></use>
              </svg>
            </div>
          </div>
          <!-- 歌词 -->
          <div
            class="lrc"
            @click="toggleStatus"
            v-show="showLyric"
          >
            <scroll
              class="wrapper"
              ref="scroll"
              :pullDownRefresh="false"
              :pullUpLoad="false"
              @scroll-start="lyricScroll = false"
              @scroll-end="lyricScroll = true"
            >
              <div class="lrc-content content">
                <div class="lrc-box">
                  <div
                    class="lrc-list"
                    :class="{'lrc-select':item.show}"
                    v-for="(item, index) in lyric.lines"
                    :key="index"
                  >
                    <p>{{item.txt}}</p>
                    <p v-if="lyric.hasCN">{{item.txtCN}}</p>
                  </div>
                </div>
              </div>
            </scroll>
          </div>
        </div>
        <div class="playBar">
          <musicProgress></musicProgress>
          <!-- 操作区域 -->
          <div class="playitem">
            <div class="child">
              <svg
                class="icon"
                aria-hidden="true"
                @click="switchType"
              >
                <use :href="playtype"></use>
              </svg>
            </div>
            <div
              class="child"
              @click="prevSong"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-skipprevious"></use>
              </svg>
            </div>
            <div
              class="child"
              @click="togglePlay"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use :href="PlayOrPause"></use>
              </svg>
            </div>
            <div
              class="child"
              @click="nextSong"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-skipnext"></use>
              </svg>
            </div>
            <div class="child">
              <svg
                class="icon"
                aria-hidden="true"
                @click="showList = true"
              >
                <use xlink:href="#icon-formatlistbulleted"></use>
              </svg>
            </div>
          </div>
          <songlistModal
            v-model="showList"
            @cb="showList = false"
            @callback="initLyric"
          ></songlistModal>
        </div>
      </section>
    </view-box>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { ViewBox } from 'vux'
import scroll from '@/components/scroll'
import canvasCircle from '@/components/anime/canvasCircle'
import musicProgress from '@/components/audio/progress'
import songlistModal from './songlistModal'
import Circle from '@/components/anime/circle'
export default {
  name: 'play',
  data() {
    return {
      song: { description: '', tags: [] },
      creator: {},
      lrc: [],
      showLyric: false,
      percent: 90,
      duration: 600,
      //modal
      showList: false,
      lyricScroll: true,
      lyric: {}
    }
  },
  props: {
    id: {
      type: String
    }
  },
  watch: {
    lyricObj: {
      handler(v) {
        this.lyric = v
      },
      immediate: true
    },
    currentTime(v) {
      let currentTime = v
      let duration = this.durationTime
      let percent = currentTime / duration
      if (percent == 1) {
        percent = 0 //当播放完成，进度条跳到开始
      }
      let Lyric = this.lyric.lines
      if (Lyric === undefined) {
        return
      }
      try {
        for (let i = 0; i < Lyric.length - 1; i++) {
          Lyric[i].show = false
          if (v * 1000 > Lyric[i].time && v * 1000 < Lyric[i + 1].time) {
            this.$set(Lyric, i, Object.assign(Lyric[i], { show: true }))
            this.lyricScroll &&
              this.$refs.scroll.scrollTo(
                0,
                -i * (25 + this.lyric.hasCN ? 35 : 0) + 220
              )
            break
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: {
    ViewBox,
    scroll,
    canvasCircle,
    musicProgress,
    songlistModal
  },
  computed: {
    top() {
      return (417 - 375) / 2 + 'px'
    },
    playtype() {
      const obj = {
        3: '#icon-repeatone',
        1: '#icon-repeat',
        2: '#icon-swaphoriz'
      }
      return obj[this.playType]
    },
    PlayOrPause() {
      return this.playing ? '#icon-playarrow' : '#icon-pause'
    },
    ...mapState('music', [
      'audio',
      'lyricTxt',
      'lyricTxtCN',
      'lyricObj',
      'change',
      'playing',
      'loading',
      'songList',
      'playType',
      'currentTime',
      'currentIndex',
      'prBufferedTime',
      'tmpCurrentTime',
      'durationTime',
      'prCurrentTime'
    ])
  },
  beforeDestroy() {
    this.canvas = null
  },
  mounted() {
    this.initLyric()
  },
  methods: {
    ...mapMutations('music', [
      'play',
      'pause',
      'setcurrentTime',
      'setdurationTime',
      'prev',
      'next',
      'switchType'
    ]),
    ...mapActions('music', ['getListPlay']),
    async prevSong() {
      await this.prev()
      await this.getListPlay()
      await this.initLyric()
    },
    async nextSong() {
      await this.next()
      await this.getListPlay()
      await this.initLyric()
    },
    initLyric() {
      this.$nextTick(() => {
        this.canvas = new Circle('.canvas')
        this.$root.$el.style.paddingBottom = 0
      })
    },
    toggleStatus() {
      this.showLyric = !this.showLyric
    },
    togglePlay() {
      this.canvas.switch(!this.playing)
      if (this.playing) {
        this.pause()
      } else {
        this.play()
      }
    }
  }
}
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
      content: '';
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
      padding: 20px 0;
      color: #fefefe;
      text-align: center;
      height: 480px;
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
            > p {
              font-size: 16px;
              color: #ff2d55;
            }
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
