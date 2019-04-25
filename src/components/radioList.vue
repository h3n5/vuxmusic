<template>
  <div class="songList" >
    <div class="imgBox">
        <img v-lazy="song.coverImgUrl">
        <span><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-earPhone"></use>
        </svg>{{countNumber(song.playCount)}}</span>
    </div>
    <div class="wordBox">
        <p class="top">{{song.name}}</p>
        <p class="bottom">{{song.name}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "songList",
  props: {
    song: {
      type: Object,
      default: ()=>{
        return {
          name: "",
          playCount: 0,
          picUrl: ""
        }
      }
    }
  },
  data() {
    return {};
  },

  methods: {
    countNumber(number){
      if(number > 100000){
        return parseInt(number).toString().slice(0,-4)+'万'
      }else{
        return ~~number
      }
    }
  }
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
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 10px;
  .imgBox {
    position: relative;
    flex: 3;
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
      color: #ddd;
      font-size: 12px;
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
  .wordBox{
    height: 100%;
    flex:7;
    p {
        padding: 5px;
        height: 50%;
        display: flex;
        justify-content: center;
        text-align: center;
        .ellipsis(1);
    }
  }

}
</style>
