<template>
  <div class="mContent">
      <Banner></Banner>
      <div class="songList">
        <button-tab class="tag">
            <button-tab-item @on-item-click="tagChange"><x-icon type="ios-keypad" size="14" class="icon"  fill="#999"></x-icon>电台分类</button-tab-item>
            <button-tab-item @on-item-click="tagChange"><x-icon type="ios-list" size="14" class="icon" fill="#999"></x-icon>电台排行</button-tab-item>
        </button-tab>
        <div class="listItem">
            <div class="title">
                <p class="title-word">今日优选</p>
                <p class="random"><x-icon type="ios-refresh" fill="#999"></x-icon></p>
            </div>

            <radioList
                v-for="(item, index) in songs" :key="index"
                class="content"
                :song=item
            ></radioList>
        </div>
      </div>
  </div>
</template>
<script>
import {
  getBanner,
  getpersonalized,
  getSongListByOrder
} from "@/api/api";
import { mapGetters, mapActions } from "vuex";
import radioList from "@/components/radioList";
import { ButtonTab, ButtonTabItem } from 'vux'
import Banner from '@/components/Banner';
export default {
  name: "mContentRadioList",
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
    radioList,
    ButtonTab,
    ButtonTabItem,
    Banner
  },
  computed: {
    ...mapGetters("menu", ["mainContentTab", "mainTag"])
  },
  methods: {
    ...mapActions("menu", ["action_getAllTag"]),
    tagChange() {
      
    },
    async getTag(params = {}) {
      this.action_getAllTag(params)
    },
    async getBannerData() {
      let res = await getBanner();
      this.imgList = res.data.banners;
    },
    async getpersonalizedDate() {
      let res = await getpersonalized();
      this.songs = this.sortRandom(res.data.result).splice(0, 6);
    },
    async getSongList(data={}) {
      let res = await getSongListByOrder(data);
      this.songs = this.sortRandom(res.data.playlists).splice(0, 6);
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
    this.getBannerData();
    this.getSongList();
    this.getTag();
  }
};
</script>

<style lang='less' scoped>
.mContent {
    .mr10{
        margin: 10px;
    }
  .bannerImg {
    height: 100%;
  }
  .tabselected {
    color: #000;
  }
  .songList {
    padding: 5px 5px;
    .tag {
        padding: 15px 40px;
        .icon{
            height: 100%;
            vertical-align: top;
            margin-right: 5px;
        }
    }

    .listItem {
      display: flex;
      flex-flow: row wrap;
      padding: 3px;
      .title{
          padding-bottom: 15px;
          display: flex;
          .title-word{
            padding-left: 10px;
            flex: 1;
          }
          .random{
              flex:1;
              text-align: right
          }
      }
      > div {
        flex-basis: 100%;
        padding: 0 3px;
      }
    }
  }
}
</style>
