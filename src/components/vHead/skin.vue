<template>
  <div class="skin">
    <vSvg icon="icon-settingsiconskin" @click.native="isShow = !isShow" />
    <vActionsheet mask v-model="isShow">
      <div class="theme">
        <div
          class="color"
          :color="item.value"
          v-for="(item, index) in color"
          :key="index"
          @click="changeColor(item.value)"
        >
          <i class="color-icon" :style="{ 'background-color': item.value}" />
          {{item.name}}
          <vSvg v-if="css['--primary'] === item.value" class="color-select" icon="icon-select" />
        </div>
      </div>
    </vActionsheet>
  </div>
</template>
<script>
import vActionsheet from "@/components/vActionsheet";
import { mapMutations, mapState } from "vuex";
export default {
  name: "skin",
  components: {
    vActionsheet
  },
  data() {
    return {
      isShow: false
    };
  },
  created() {
    this._css({ key: '--primary', value: this.css['--primary'] })
  },
  computed: {
    ...mapState("menu", ["css", "color"])
  },
  methods: {
    ...mapMutations("menu", ["_css"]),
    changeColor(value) {
      this._css({
        key: "--primary",
        value
      });
      this.isShow = false;
    }
  }
};
</script>
<style lang="less" scope>
.skin {
  margin: 1px 0;
  padding: 0 5px;
}
.theme {
  .color {
    padding: 10px 40px;
    font-size: 14px;
    position: relative;
    .color-icon {
      position: absolute;
      left: 10px;
      top: 10px;
      border-radius: 50%;
      height: 20px;
      width: 20px;
    }
    .color-select {
      position: absolute;
      right: 10px;
      top: 10px;
      height: 20px;
      width: 20px;
      fill: @maincolor;
    }
  }
}
</style>