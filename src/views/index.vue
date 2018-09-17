<template>
  <div class="main">
    <m-head></m-head>
    <!-- 标签 -->
    <tab :line-width=2 active-color='#fc378c' >
        <tab-item active-class='tabselected' class="vux-center" :selected="tabIndex === item.type" v-for="(item, index) in mainTab" @on-item-click="tabIndex = item.type"  :key="index">{{item.name}}</tab-item>
    </tab>
    <!-- 轮播 + 推荐 -->
    <scroll class="wrapper"
            ref="scroll"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"     
            :startY="parseInt(startY)"
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
    <!---->
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
import { mapGetters, mapMutations } from "vuex";
import mHead from "@/components/TabBar";
import commend from "@/components/mContent/commend";
import songList from "@/components/mContent/songList";
import anchorRadio from '@/components/mContent/anchorRadio';
import ranking from '@/components/mContent/ranking';
import scroll from "@/components/scroll";
import { setTimeout } from "timers";
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
    scroll,
  },
  data() {
    return {
      tabIndex: "commend",
      loadEnd: true,
      scrollbarObj: { fade: true, interactive: true },
      startY: 0,
      pullDownRefreshObj: {
        threshold: 50,
        stop: 20
      },
      pullUpLoadObj: { threshold: 50 }
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
      this.pullingDownFlagChange(true);
      this.tabIndexChange(this.tabIndex);
    },
    pullingUp() {
      this.pullingUpFlagChange(true);
      this.tabIndexChange(this.tabIndex);
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
