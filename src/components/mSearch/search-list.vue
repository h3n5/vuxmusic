<template>
  <div>
    <ul class="music">
        <li class="item" v-for="(item, index) in songs" :key="index">
            <div class="left">
                <p class="top">{{item.name}}</p>
                <p class="bottom"><span v-for="(v, i) in item.artists">{{v.name}} / </span> - <span class="blue">{{item.album.name}}</span></p>
            </div>
            <div class="right" @click="play(item)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex';
export default {
  name: "sl",
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    ...mapActions("music",["AddAndPlay"]),
    play(v) {
      console.log(v);
      let song ={
            id: v.id,
            name: v.name,
            artists: v.artists,
            albumPic: '@/assets/play/player-bar.png',
            album: v.album
      }
      this.AddAndPlay(song);
      this.$router.push("/play/"+v.id)
    }
  }
};
</script>

<style lang='less' scoped>
.ellipsis(@num) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @num;
}
.music {
  margin: 0px 10px;
  border-top: 1px solid #999;
  .item {
    margin: 5px 0;
    border-bottom: 1px solid #999;
    display: flex;
    .left{
        flex: 1 1 auto;
        .top {
        padding: 5px 0;
        .ellipsis(1);
        }
        .bottom {
        font-size: 12px;
        margin: 5px 0;
         color: #888;    
        .ellipsis(1);
        .blue{
          color: @mblue;
        }
        }
    }
    .right{
        min-width: 60px;
        flex-basis: 60px;
        display: flex;
          justify-content: center;
          align-items: center;
        .icon{
          font-size: 30px;
        }
    }
  }
}
</style>
