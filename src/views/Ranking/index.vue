<template>
  <div class="mContent">
      <div class="songList">
        <div class="listItem">
            <div class="title">
                <p class="title-word">云音乐官方版</p>
                <p class="random"></p>
            </div>
            <rankingList
                v-for="(item, index) in songs" :key="index"
                class="content"
                :song=item
            ></rankingList>
        </div>
      </div>
  </div>
</template>
<script>
import {
  getpersonalized,
  getSongListByOrder
} from "@/api/api";
import { mapGetters, mapActions } from "vuex";
import rankingList from "@/components/rankingList";
import { ButtonTab, ButtonTabItem } from 'vux'
import test from './test';
export default {
  name: "mContentRanking",
  data() {
    return {
      imgList: [],
      songs: [],
    };
  },
  components: {
    rankingList,
    ButtonTab,
    ButtonTabItem,
    test
  },
  computed: {
    ...mapGetters("menu", ["mainContentTab", "mainTag"])
  },
  methods: {
    ...mapActions("menu", ["action_getAllTag"]),
    tagChange() {
      //console.log(object);
    },
    async getTag(params = {}) {
      this.action_getAllTag(params)
    },
    async getpersonalizedDate() {
      let res = await getpersonalized();
      this.songs = this.sortRandom(res.data.result).splice(0, 6);
    },
    async getSongList(data={}) {
      let res = await getSongListByOrder(data);
      this.songs = this.sortRandom(res.data.playlists).splice(0, 6);
    },
    sortRandom(arr = []) {
      return arr.sort(() => {
        return Math.random() > 0.5 ? true : false;
      });
    }
  },
  created() {
    this.getSongList();
    this.getTag();
  }
};
</script>

<style lang='less' scoped>
.mContent {
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
