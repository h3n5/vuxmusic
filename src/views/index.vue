<template>
  <div class="main">
    <m-head></m-head>
    <!-- 标签 -->
    <tab :line-width=2 active-color='#fc378c' >
        <tab-item 
        active-class='tabselected'
        class="vux-center"
        :selected="tabIndex === item.type"
        v-for="(item, index) in mainTab"
        @on-item-click="tabIndex = item.type"
        :key="index">
        {{item.name}}
        </tab-item>
    </tab>
    <!-- 轮播 + 推荐 -->
    <scroll class="wrapper"
            ref="scroll"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
            >
            <component
              :is="tabIndex"
              @pulldowncallback="pulldowncallback"
              @pullupcallback="pullupcallback"
              @loadEnd=" loadEnd = false"
             ></component>
    </scroll> 
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
import { mapGetters, mapMutations } from "vuex";
import mHead from "@/components/TabBar";
import commend from "@/views/Commend";
import songList from "@/views/SongList";
import anchorRadio from "@/views/AnchorRadio";
import ranking from "@/views/Ranking";
import scroll from "@/components/scroll";
export default {
  name: "index",
  components: {
    mHead,
    Tab,
    TabItem,
    commend,
    songList,
    anchorRadio,
    ranking,
    scroll
  },
  data() {
    return {
      tabIndex: "commend",
      loadEnd: true
    };
  },
  computed: {
    ...mapGetters("menu", ["mainTab"])
  },
  methods: {
    ...mapMutations("scroll", [
      "pullingDownFlagChange",
      "pullingUpFlagChange",
      "tabIndexChange"
    ]),
    pullingDown() {
      if(!this.loadEnd){
        this.loadEnd  = !this.loadEnd
      }
      this.pullingDownFlagChange();
      this.tabIndexChange(this.tabIndex);
      this.$nextTick(() => {
        this.$refs.scroll.forceUpdate(false);
      });
    },
    pullingUp() {
      if(this.loadEnd){
        this.pullingUpFlagChange();
        this.tabIndexChange(this.tabIndex);
      }
      this.$nextTick(() => {
        this.$refs.scroll.forceUpdate(this.loadEnd);
      });
    },
    pulldowncallback() {
      this.$refs.scroll._reboundPullDown();
      this.pullingDownFlagChange(false);
    },
    pullupcallback() {
      // this.$refs.scroll._PullUpFinish()
      this.pullingUpFlagChange(false);
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  display: flex;
  flex-flow: column nowrap;
  .wrapper {
    flex: 1;
  }
}
</style>
