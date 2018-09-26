<template>
<div class="loader">
  <span v-for="i in 4" :key="i" :style="animation"></span>
</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "",
  components: {},
  data() {
    return {
    };
  },
  computed: {
      ...mapState("music",["playing"]),
      animation(){
          return {"animation-play-state":this.playing?"running":"paused"}
      }
  },
  methods: {}
};
</script>
<style lang='less' scoped>
.loader {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  justify-content: center;
  height: 25px;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
}

.loader span {
  flex: 0 1 2px;
  background: #ccc;
  width: 1px;
  height: 100%;
  border-radius: 14px;
  margin: 0 3px;
  float: left;
  // margin-top: 25%;
}
.loader span:nth-child(1) {
  animation: lineload 1s 1.4s infinite linear;
}
.loader span:nth-child(2) {
  animation: lineload 1s 0.8s infinite linear;
}
.loader span:nth-child(3) {
  animation: lineload 1s 1.4s infinite linear;
}
.loader span:nth-child(4) {
  animation: lineload 1s 0.8s infinite linear;
}
@keyframes lineload {
  0% {
    background: #ccc;
    height: 30%;
  }
  50% {
    // background: #444;
    height: 100%;
  }
  100% {
    background: #ccc;
    height: 30%;
  }
}
</style>
