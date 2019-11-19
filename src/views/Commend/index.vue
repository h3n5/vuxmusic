<template>
  <div class="mContent">
    <Banner></Banner>
    <div class="menu">
      <div
        class="menuList"
        v-for="(item, index) in mainContentTab"
        :key="index"
        @click="$router.push(item.route)"
      >
        <div class="svg-block">
          <vSvg class="svg" :icon="item.icon" />
        </div>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="songList">
      <p>推荐歌单</p>
      <div class="listItem">
        <PicBlock
          v-for="item in songs"
          :key="item.id"
          :picUrl="item.picUrl"
          :playCount="item.playCount"
          :name="item.name"
          @click.native="$router.push('/SongListDetail/'+item.id)"
        ></PicBlock>
      </div>
    </div>
  </div>
</template>
<script>
import { getpersonalized } from "@/api/api";
import { mapGetters, mapState } from "vuex";
import Banner from "@/components/Banner";
import PicBlock from "@/components/PicBlock";
export default {
  name: "mContentRecommend",
  props: {
    pullingDown: Boolean,
    pullingUp: Boolean
  },
  data() {
    return {
      imgList: [],
      songs: []
    };
  },
  components: {
    PicBlock,
    Banner
  },
  computed: {
    ...mapGetters("menu", ["mainContentTab"]),
    ...mapState("scroll", ["tabIndex", "pullingDownFlag", "pullingUpFlag"])
  },
  watch: {
    pullingDownFlag(v) {
      if (v) {
        if (this.tabIndex === "commend") {
          this.getpersonalizedDate();
          this.$toast("推荐已经更新");
          this.$emit("pulldowncallback");
        }
      }
    },
    pullingUpFlag(v) {
      if (v) {
        if (this.tabIndex === "commend") {
          this.getpersonalizedDateMore();
          this.$emit("pullupcallback");
        }
      }
    }
  },
  methods: {
    async getpersonalizedDate() {
      let res = await getpersonalized();
      this.songs = this.sortRandom(res.data.result).slice(0, 6);
    },
    async getpersonalizedDateMore() {
      let res = await getpersonalized();
      let random = this.sortRandom(res.data.result);
      random = random.filter(vv => {
        return !this.songs.map(v => v.id).includes(vv.id);
      });
      if (random.length === 0) {
        this.$emit("loadEnd");
      }
      this.songs = this.songs.concat(random.splice(0, 6));
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
    this.getpersonalizedDate();
  }
};
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
.imgfm(@bgc){
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: url(@bgc) center no-repeat;
  background-size: 140%;
  background-color: @maincolor;
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
    padding: 10px 0;
    .menuList {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      .svg-block{
          background: @maincolor;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          .svg{
            width: 20px;
            height: 20px;
          }
      }
      p {
        padding-top: 5px;
        font-size: 12px;
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
        flex:0 0 calc(100%/3);
        width: calc(100%/3);
        padding: 0 3px;
        }
    }
  }
}
</style>
