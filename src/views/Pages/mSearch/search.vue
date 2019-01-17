<template>
  <div>
    <div class="head">
      <div class="search">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
        <input
          type="text"
          :value="search"
          @input="updatesearch"
          ref="searchinput"
          @click.enter="searchClick"
        >
      </div>
      <div style="color:#fff" @click="back">取消</div>
    </div>
    <!-- 热门搜索 -->
    <hotsearch @goSearch="searchClick"></hotsearch>
    <!-- 搜索列表 -->
    <searchlist :songs="songs"></searchlist>
  </div>
</template>

<script>
import hotsearch from "./hot-search.vue";
import searchlist from "./search-list.vue";
import { searchMusic } from "@/api/api";
import { mapState } from "vuex";
import lodash from '@/util';
export default {
  name: "search",
  components: {
    searchlist,
    hotsearch
  },
  computed: {
    ...mapState("music", ["search"])
  },
  mounted() {
    //this.$refs.searchinput.focus();
  },
  data() {
    return {
      songs: []
    };
  },
  methods: {
    updatesearch:lodash.throttle(function(e){
      this.searchClick()
      this.$store.commit("music/updateMessage", e.target.value);
    },1000),
    async searchClick() {
      //console.log(this.search);
      let res = await searchMusic(this.search);
      //console.log(res.data.result.songs);
      this.songs = res.data.result.songs;
    },
    back() {
      this.$router.push("/index");
    }
  }
};
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 15px;
  background: #db2523;
  > div {
    padding: 0 10px;
  }
  .micro {
    flex: 0 0 50px;
    height: 32px;
    background: url("/assets/microphone-o.png") center no-repeat;
  }
  .search {
    flex: auto;
    height: 100%;
    position: relative;
    .icon {
      position: absolute;
      color: #ddd;
      left: 20px;
      top: 8px;
    }
    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: rgba(221, 221, 221, 0.37);
      border-radius: 15px;
      padding: 0 30px;
      color: #ddd;
    }
  }
  .play {
    flex: 0 0 50px;
    height: 32px;
    background: url("/assets/lines.png") center no-repeat;
  }
}
</style>
