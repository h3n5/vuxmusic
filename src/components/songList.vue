<template>
  <div class="songList" >
    <div class="imgBox">
        <img v-lazy="song.picUrl">
        <span>{{song.playCount}}</span>
    </div>
    <p>{{song.name}}</p>
  </div>
</template>

<script>
export default {
  name: "songList",
  props: {
    song: {
      type: Object,
      default: {
        name: "",
        playCount: 0,
        picUrl: ""
      }
    }
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang='less' scoped>
.ellipsis(@num){
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:@num;
}
.songList {
  .imgBox {
    position: relative;
    width: 100%;
    &::before {
      content: "";
      display: inline-block;
      padding-bottom: 100%;
      width: 0.1px;
      vertical-align: middle;
    }
    span {
      position: absolute;
      top: 5px;
      right: 5px;
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }
  }
  p {
    padding: 5px;
    text-align: center;
    font-size: 14px;
    .ellipsis(1)
  }
}
</style>
