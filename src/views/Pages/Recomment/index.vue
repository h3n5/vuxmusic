<template>
  <div>
    <mheader title="每日推荐"></mheader>
    <SongListInfo :creator="creator" :coverImgUrl="playlist.coverImgUrl" :name="playlist.name"></SongListInfo>
    <SongList :tracks="tracks"></SongList>
  </div>
</template>

<script>
import mheader from "@/components/header-3";
import SongList from "./SongList";
import SongListInfo from "./SongListInfo";
import { recommendSongs } from "@/api/api";
export default {
  name: "SongListDetail",
  components: {
    mheader,
    SongList,
    SongListInfo
  },
  data() {
    return {
      playlist: {
        coverImgUrl:'@/assets/123.jpg',
        name:'每日推荐'
      },
      creator: {
        name:'每日推荐'
      },
      tracks: []
    };
  },
  created() {
    recommendSongs().then(res => {
      this.tracks = res.data.recommend
    })
  },
  methods: {

  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      document.querySelector(".uheight") &&
        document.querySelector(".uheight").classList.remove("uheight");
    });
  },
  beforeRouteLeave(to, from, next) {
    next(() => {
      document.querySelector(".uheight") &&
        document.querySelector(".router").classList.add("uheight");
    });
  }
};
</script>

<style lang='less' scoped>
</style>
