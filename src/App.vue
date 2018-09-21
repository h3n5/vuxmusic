<template>
  <div id="app" ref="app"  @touchstart.self="touchstart">
      <v-touch  v-on:swiperight="onSwipeRight"  tag="div">
        <transition :name="transitionName">
            <keep-alive>
             <router-view class="router"/>
            </keep-alive>
            </transition>
       </v-touch>
    <mfoot v-if="showFoot"></mfoot>
  </div>
</template>
<script>
import mfoot from "@/components/footer.vue";
import { mapState } from "vuex";
export default {
  components: {
    mfoot
  },
  computed: {
    ...mapState("menu", ["showFoot"])
  },
  data() {
    return {
      transitionName: "",
      vueTouches: {
        x: '',
        y: ''
      },
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
        
    }
  },
  methods:{
    // 开始滑动
    touchstart (e) {
      if (true) {
        this.vueTouches = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY }
        console.log(this.vueTouches );
      }
    },
    onSwipeRight(){
      //this.$router.go(-1)
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  height: 100%;
  padding-bottom: 53px;
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
/* 左滑 */
.slide-left-enter-active, .slide-left-leave-active {
  transition: all .3s;
}
.slide-left-enter, .slide-left-leave-active {
  // opacity: 0;
  background: #2c3e50;
}
.slide-left-enter {
  transform: translateX(375px);
  // transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  transform: translateX(-375px);
  // transform: translate3d(-100%, 0, 0);
}
/* 右滑 */
.slide-right-enter-active, .slide-right-leave-active {
  transition: all .3s;
}
.slide-right-enter, .slide-right-leave-active {
  // opacity: 0;
}
.slide-right-enter {
  transform: translateX(-375px);
}
.slide-right-leave-active {
  transform: translateX(375px);
}
/* 页面切换 动态效果 */
</style>
