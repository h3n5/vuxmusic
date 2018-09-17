<template>
<div>
    <mHead
      @left="leftselect"
    ></mHead>
    <scroll class="wrapper"
            ref="scroll"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"     
            :startY="parseInt(startY)"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
            >
            <component :is="componentId" :list="list"></component>
    </scroll>
</div>
</template>

<script>
import mHead from "@/components/header-3";
import scroll from "@/components/scroll";
import mContent from "@/components/mFriend/mFriend";
import mContentRight from '@/components/mFriend/mFriendRight';
export default {
  name: "",
  components: { mHead, mContent, scroll,mContentRight },
  data() {
    return {
      scrollbarObj: { fade: true, interactive: true },
      startY: 41,
      pullDownRefreshObj: {
        threshold: 50,
        stop: 20
      },
      pullUpLoadObj: { threshold: 50 },
      list: [1, 2, 3],
      selectleft:true,
    };
  },
  computed:{
    componentId(){
      return this.selectleft?"mContent":"mContentRight"
    }
  },
  methods: {
    pullingDown() {},
    pullingUp() {
      this.$nextTick(() => {
        this.$refs.scroll.forceUpdate(true);
      });
    },
    leftselect(v) {
      this.selectleft = v
    }
  }
};
</script>

<style lang='less'>
</style>
