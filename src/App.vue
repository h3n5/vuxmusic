<template>
  <div id="app" ref="app"  @touchstart.self="touchstart">
      <v-touch  v-on:swiperight="onSwipeRight"  tag="div" style="height:100%">
        <transition :name="transitionName">
            <keep-alive>
             <router-view class="router" style="height:100%"/>
            </keep-alive>
            </transition>
       </v-touch>
    <musicplayer></musicplayer>
    <!-- <mfoot v-if="showFoot"></mfoot> -->
  </div>
</template>
<script>
import mfoot from "@/components/footer.vue";
import musicplayer from "@/components/audio/audio.vue";
import { mapState } from "vuex";
export default {
  components: {
    mfoot,
    musicplayer
  },
  computed: {
    ...mapState("menu", ["showFoot"])
  },
  data() {
    return {
      transitionName: "",
      vueTouches: {
        x: "",
        y: ""
      }
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      const toSort = to.meta.sort;
      const fromSort = from.meta.sort;
      if (toSort && fromSort) {
        this.transitionName = toSort < fromSort ? "slide-right" : "slide-left";
      } else {
        this.transitionName =
          toDepth < fromDepth ? "slide-right" : "slide-left";
      }
    }
  },
  methods: {
    // 开始滑动
    touchstart(e) {
      //if (true) {
      this.vueTouches = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      };
      //console.log(this.vueTouches );
      //}
    },
    onSwipeRight() {
      //this.$router.go(-1)
    }
  }
};
</script>
<style lang="less">
@import "~vux/src/styles/1px.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  height: 100%;
  // padding-bottom: 53px;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  &:hover {
    color: #2c3e50;
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.router {
  transition: all 0.5s;
  position: absolute;
  width: 100%;
}
/* 左滑 */
.slide-left-enter {
  transform: translateX(375px);
  // transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  transform: translateX(-375px);
  // transform: translate3d(-100%, 0, 0);
}
/* 右滑 */
.slide-right-enter {
  transform: translateX(-375px);
}
.slide-right-leave-active {
  transform: translateX(375px);
}
/* 页面切换 动态效果 */
</style>
