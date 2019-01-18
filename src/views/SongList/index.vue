<template>
  <div class="mContent">
      <Banner></Banner>
      <div class="songList">
        <div class="titlte">
          <p class="left" @click="tagChange({name:'全部歌单'})">全部歌单</p>
          <p class="right">
            <span class="tag" v-for="(item, index) in mainTag" :key="index" @click="tagChange(item)">{{item.name}} | </span>
          </p>
        </div> 
        <div class="listItem">
          <PicBlock 
          v-for="(item) in songs" 
          :key="item.id"
          :picUrl="item.coverImgUrl"
          :playCount="item.playCount"
          :name="item.name"
          @click.native="$router.push('/SongListDetail/'+item.id)"
          ></PicBlock>
        </div>
      </div>
  </div>
</template>
<script>
import {
  getSongListByOrder
} from "@/api/api";
import { mapGetters, mapActions,mapState } from "vuex";
import PicBlock from '@/components/PicBlock';
import Banner from '@/components/Banner';
import { Swiper, SwiperItem } from "vux";
export default {
  name: "mContentSongList",
  props: {
    pullingDown:Boolean,
    pullingUp:Boolean
  },
  data() {
    return {
      imgList: [],
      songs: [],
    };
  },
  components: {
    Swiper,
    SwiperItem,
    Banner,
    PicBlock
  },
  computed: {
    ...mapGetters("menu", ["mainContentTab", "mainTag"]),
     ...mapState("scroll", ["tabIndex", "pullingDownFlag", "pullingUpFlag"])
  },
  watch: {
    pullingDownFlag(v) {
      if (v) {
        if (this.tabIndex === "songList") {
          this.getSongList();
          this.$emit("pulldowncallback");
        }
      }
    },
    pullingUpFlag(v) {
      if (v) {
        if (this.tabIndex === "songList") {
          this.getSongList({},true);
          this.$emit("pullupcallback");
        }
      }
    }
  },
  methods: {
    ...mapActions("menu", ["action_getAllTag"]),
    tagChange(object) {
      let data = { cat: object.name };
      this.getSongList(data);
    },
    async getTag(params = {}) {
      this.action_getAllTag(params)
    },
    async getSongList(data={},add = false) {
      let res = await getSongListByOrder(data);
      if(add){
        var r = this.sortRandom(res.data.playlists).filter(v => !this.songs.map(v => v.id).includes(v.id)).slice(0, 6)
        this.songs = this.songs.concat(...r)
      }else{
        this.songs = this.sortRandom(res.data.playlists).slice(0, 6);
      }
      
    },
    sortRandom(a) {
      let len = a.length;
      for (let i = len - 1; i >= 0; i--) {
        var pos = ~~(Math.random() * i);
        [a[i], a[pos]] = [a[pos], a[i]];
      }
      return a;
    }
  },
  created() {
    this.getSongList();
    this.getTag();
  }
};
</script>

<style lang='less' scoped>
.mixin() {
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
  .songList {
    padding: 5px 5px;
    .titlte {
      display: flex;
      justify-content: space-between;
      p {
        position: relative;
        padding: 5px 10px;
      }
      .left {
        .mixin();
      }
      .right {
        .tag {
          font-size: 14px;
        }
      }
    }

    .listItem {
      display: flex;
      flex-flow: row wrap;
      padding: 3px;
      > div {
        flex-basis: calc(100% / 2);
        padding: 0 3px;
      }
    }
  }
}
</style>
