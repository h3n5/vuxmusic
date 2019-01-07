<template>
  <swiper :show-dots="false" :aspect-ratio="0.5" :auto="true">
    <swiper-item v-for="(item) in imgList" :key="item.id">
      <img v-lazy="item.imageUrl" alt="img" class="bannerImg">
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "vux";
import { getBanner } from "@/api/api";
export default {
  name: "Banner",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      imgList: []
    };
  },
  created() {
    this.getBannerData();
  },
  methods: {
    async getBannerData() {
      let res = await getBanner();
      this.imgList = res.data.banners;
    }
  }
};
</script>

<style lang='less' scoped>
.bannerImg {
  height: 100%;
}
</style>
