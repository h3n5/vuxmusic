<template>
  <div id="app" ref="app">
    <transition :name="transitionName">
      <keep-alive :include="alive">
        <router-view class="router uheight"/>
      </keep-alive>
    </transition>
    <musicplayer></musicplayer>
  </div>
</template>
<script>
import musicplayer from '@/components/audio/audio.vue'
import { mapState } from 'vuex'
export default {
  components: {
    musicplayer
  },
  computed: {
    ...mapState('menu', ['alive'])
  },
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      const toSort = to.meta.sort
      const fromSort = from.meta.sort
      if (toSort && fromSort) {
        this.transitionName = toSort < fromSort ? 'slide-right' : 'slide-left'
      } else {
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
}
</script>
<style lang="less">
@import '~@/assets/css/1px.less';
#app {
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  color: @blackf;
  height: 100%;
}
html,
body {
  height: 100%;
  width: 100%;
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
  overflow-x: hidden;
}
.uheight {
  height: 100%;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
