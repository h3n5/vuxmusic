<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(item) in imgList" :key="item.id" class="swiper-slide">
      <img v-lazy="item.imageUrl" alt="img" class="bannerImg" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { getBanner } from "@/api/api";
export default {
  name: "Banner",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      imgList: [],
      swiperOption: {
        auto: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
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
  width: 100%;
  border-radius: 5px;
}
.swiper-slide {
  height: 140px;
  padding: 0 15px;
}
</style>
