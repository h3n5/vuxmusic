<template>
  <scroll direction="horizontal" :scrollbar="false">
    <div
      class="tab"
      :class="{selected: value === index }"
      :style="style"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('input',index)"
    >{{item.name}}</div>
    <span class="border" :style="bStyle"></span>
    <i slot="pullup"></i>
    <i slot="pulldown"></i>
  </scroll>
</template>

<script>
import scroll from "@/components/Scroll/scroll-h";
export default {
  name: "vtab",
  props: {
    value: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    },
    auto: {
      type: Boolean,
      default: false
    },
    bwidth: {
      type: String,
      default: "30px"
    },
    pwidth: {
      type: String,
      default: "60px"
    }
  },
  computed: {
    style() {
      return this.auto ? { flex: 1 } : null; //{ width: this.pwidth }
    },
    bStyle() {
      const perWidth = this.auto
        ? document.body.offsetWidth / this.list.length
        : parseInt(this.pwidth);
      const borWidth = this.bwidth.includes("%")
        ? (parseInt(this.bwidth) / 100) * document.body.offsetWidth
        : parseInt(this.bwidth);
      const halfdistance = (perWidth - borWidth) / 2;
      return {
        width: this.bwidth,
        transform: `translateX(${halfdistance + this.value * perWidth}px)`
      };
    }
  },
  components: {
    scroll
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang='less' scoped>
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tab {
  flex: 0 0 60px;
  padding: 0 5px;
  font-size: 14px;
  position: relative;
  color: #7d7e80;
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-sizing: border-box;
}
.selected {
  color: @maincolor;
}
.border {
  z-index: 1;
  left: 0;
  bottom: 5px;
  height: 3px;
  position: absolute;
  border-radius: 3px;
  background-color: @maincolor;
}
</style>
