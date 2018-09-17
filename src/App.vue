<template>
  <div id="app" ref="app">
    <keep-alive>
       <router-view/>
    </keep-alive>
    <mfoot v-if="showFoot"></mfoot>
  </div>
</template>
<script>
import mfoot from '@/components/footer.vue';
import { mapState } from 'vuex';
export default {
  components:{
    mfoot
  },
  computed:{
    ...mapState("menu",["showFoot"])
  }
}
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
html, body {
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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
  &:hover{
    color: #2c3e50
  }
}
 .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
