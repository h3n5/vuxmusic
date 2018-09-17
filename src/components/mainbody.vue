<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onItemClick">个性推荐</tab-item>
      <tab-item @on-item-click="onItemClick">主播电台</tab-item>
    </tab>
    <tab :line-width=2 active-color='#fc378c' v-model="imgIndex">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in imgList" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper :list="imgList" v-model="imgIndex" :min-moving-distance="120" ></swiper>
      <swiper v-model="imgIndex" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in imgList" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
  </div>
</template>

<script>

import { getBanner } from '@/api/api';
export default {
  name: 'tab',
  components:{

  },
  data () {
    return {
            demo2: '美食',
        imgList:['精选', '美食', '电影', '酒店', '外卖'],
        imgIndex:0
    }
  },
  methods: {
      initData(){
         //this.getBannerList()
      },
      getBannerList(){
           getBanner().then(res => {
               console.log(res);
           })
      },
      onItemClick(index){

      }
  },
  created(){
      this.initData()
  }
}
</script>


