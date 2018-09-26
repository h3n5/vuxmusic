<template>
  <div class="mContent">
      <swiper  :show-dots="false" :aspect-ratio='0.5' :auto="true">
        <swiper-item v-for="(item) in imgList" :key="item.id">
          <img v-lazy="item.picUrl" alt="img" class="bannerImg">
        </swiper-item>
      </swiper>
      <div class="menu">
        <div class="menuList" v-for="(item, index) in mainContentTab" :key="index">
          <div class="imgfm"></div>
          <p>{{item}}</p>
        </div>
      </div>
      <div class="songList">
        <p>推荐歌单</p>
        <div class="listItem">
          <songList
            v-for="(item) in songs" :key="item.id"
            class="content"
            :song=item
          ></songList>
        </div>
      </div>
      <toast v-model="show" type="text" position="top">推荐已经更新</toast>
  </div>
</template>
<script>
import { getBanner,getpersonalized } from "@/api/api"
import { mapGetters, mapState } from 'vuex';
import songList from "@/components/songList";
import {  Swiper, SwiperItem , Toast} from "vux";
export default {
  name: 'mContentRecommend',
  props:{
    pullingDown:Boolean,
    pullingUp:Boolean
  },
  data () {
    return {
      imgList:[],
      songs:[],
      show:false
    }
  },
  components:{
    songList,Swiper,SwiperItem,Toast
  },
  computed:{
    ...mapGetters("menu",["mainContentTab"]),
    ...mapState("scroll",["tabIndex","pullingDownFlag","pullingUpFlag"])
  },
  watch:{
    pullingDownFlag(v){
      if(v){
        if(this.tabIndex==="commend"){
          this.getpersonalizedDate()
          this.show = true;
          this.$emit("pulldowncallback")
        }
      }
    },
    pullingUpFlag(v){
      if(v){
        if(this.tabIndex==="commend"){
          this.getpersonalizedDateMore() 
          this.$emit("pullupcallback")
                   
        }
      }
    }
  },
  methods: {
    async getBannerData() {
      let res= await getBanner()
      this.imgList = res.data.banners;
    },
    async getpersonalizedDate(){
      let res= await getpersonalized()
      let random = this.sortRandom(res.data.result)
      this.songs = random.splice(7,6)
    },
    async getpersonalizedDateMore(){
      let res= await getpersonalized()
      let random = this.sortRandom(res.data.result)
      random = random.filter(vv => {
        return !this.songs.map(v => v.id).includes(vv.id)
      })
      if(random.length===0){
        this.$emit("loadEnd")
      }
      this.songs = this.songs.concat(random.splice(0,6))
    },
    sortRandom(arr){
      return arr.sort(() => {
        return Math.random() > 0.5 ? true :false
      })
    }
  },
  created(){
    this.getBannerData()
    this.getpersonalizedDate()
  }
}
</script>

<style lang='less' scoped>
.mixin() {
  position: relative;
  padding: 5px 10px;
  &::before {
    content: "|";
    color: @maincolor;
    display: inline-block;
    vertical-align: text-bottom;
    padding-right: 5px;
  }
  &::after {
    content: "";
    font-size: 0;
    vertical-align: baseline;
    padding-left: 5px;
    height: 10px;
    width: 10px;
    display: inline-block;
    background: url("../../assets/ARROW.png") center no-repeat;
  }
}
.mContent {
  .bannerImg {
    height: 100%;
  }
  .tabselected {
    color: #000;
  }
  .menu {
    display: flex;
    padding: 10px;
    .menuList {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      p {
        padding-top: 5px;
        font-size: 14px;
      }
      .imgfm {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        background: url("../../assets/radio.png") center no-repeat;
        background-color: @maincolor;
      }
    }
  }
  .songList {
    p {
      .mixin();
    }
    .listItem {
      display: flex;
      flex-flow: row wrap;
      padding: 3px;
      > div {
        flex-basis:calc(100%/3);
        padding: 0 3px;
        }
    }
  }
}
</style>
