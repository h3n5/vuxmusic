

<template>
  <v-touch ref="vtouch" class="touch" v-on:pan="onSwipe" v-on:panend="panend" :style="style">
    <keep-alive>
      <component :is="componentLeft" class="router router_left"></component>
    </keep-alive>
    <keep-alive>
      <router-view class="router"></router-view>
    </keep-alive>
    <keep-alive>
      <component :is="componentRight" class="router router_right"></component>
    </keep-alive>
  </v-touch>
</template>
<script>
export default {
  name: "TabView",
  components: {},
  data() {
    return {
      translateX: 0,
      componentLeft: "",
      componentRight: "p2"
    };
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.translateX})`
      };
    }
  },
  methods: {
    onSwipe(v) {
      let limit = window.innerWidth / 3;
      let distance = v.distance;
      this.translateX = v.deltaX + "px";
    },
    panend(v) {
      let limit = window.innerWidth / 3;

      let distance = v.distance;

      let moveDirect = v.deltaX < 0 ? 1 : -1;

      let routerlist = ["p1", "p2", "p3", "p4", "p5"];
      let nowRouter = this.$route.name;

      let nowIndex = routerlist.findIndex(v => v === nowRouter) + moveDirect;

      let prevRouter = routerlist[nowIndex - 1];
      let nextRouter = routerlist[nowIndex + 1];
      let thisRouter = routerlist[nowIndex];
      if (distance < limit) {
        this.translateX = 0 + "px";
      } else {
        this.componentLeft = prevRouter;
        this.componentRight = nextRouter;
        if (thisRouter) this.$router.push({ name: thisRouter });
        this.translateX = 0 + "px";
      }
    }
  }
};
</script>

<style lang="less" scope>
.router {
  position: absolute;
  height: 100%;
  width: 100%;
}
.touch {
  flex: 1;
}
</style>