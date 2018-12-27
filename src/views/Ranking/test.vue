<template>
  <div>
      <tab :line-width=2 active-color='#fc378c' >
          <tab-item 
          active-class='tabselected'
          class="vux-center"
          :selected="tabIndex === index"
          v-for="(item, index) in mainTab"
          :key="index">
          {{item.name}}
          </tab-item>
      </tab>
    <swiper  :show-dots='false' v-model="tabIndex">
      <swiper-item class="black" v-for="(item, index) in mainTab" :key="index">
          <scroll class="wrapper"
                  ref="scroll"
                  :scrollbar="scrollbarObj"
                  :pullDownRefresh="pullDownRefreshObj"
                  :pullUpLoad="pullUpLoadObj"     
                  @pullingDown="pullingDown"
                  @pullingUp="pullingUp"
                  >
                  <ul>
                      <li>{{item.name}}</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                  </ul>
          </scroll> 
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Tab, TabItem } from "vux";
import scroll from "@/components/scroll";
import { mapGetters } from "vuex";
export default {
  name: "test",
  components: {
    Swiper,
    SwiperItem,
    scroll,
    Tab,
    TabItem
  },
  computed: {
    ...mapGetters("menu", ["mainTab"])
  },
  data() {
    return {
      tabIndex: 0,
      scrollbarObj: { fade: true, interactive: true },
      startY: 0,
      pullDownRefreshObj: {
        threshold: 50,
        stop: 20
      },
      pullUpLoadObj: { threshold: 50 }
    };
  },

  methods: {
    pullingDown() {},
    pullingUp() {
      this.$nextTick(() => {
        this.$refs.scroll.forceUpdate(this.loadEnd);
      });
    }
  }
};
</script>

<style lang='less' scoped>
.wrapper{
    height: 200px;
}
</style>
