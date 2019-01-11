<template>
  <div class="songList">
    <div class="imgBox">
      <img v-lazy="picUrl">
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-earPhone"></use>
        </svg>
        {{countNumber(playCount)}}
      </span>
    </div>
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  name: "pictypeone",
  props: {
    picUrl: {
      type: String
    },
    playCount: {
      type: [Number, String]
    },
    name: {
      type: String
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
.ellipsis(@num) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @num;
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
      color: @fontColor;
      font-size: 12px;
      .icon {
        color: @fontColor;
      }
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
      border-radius: 3px;
    }
  }
  p {
    padding: 5px;
    text-align: center;
    font-size: 14px;
    .ellipsis(2);
  }
}
</style>
