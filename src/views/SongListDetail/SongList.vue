<template>
  <div>
    <div class="sticky">
        <div class="img">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-playcircleoutline"></use>
            </svg>
        </div>
        <div class="playall vux-1px-b">播放全部<span>(共{{tracks.length}}首)</span></div>
    </div>
    <ul class="songList">
        <li class="list-item" v-for="(item, index) in tracks"  :key="item.id">
            <div class="left">{{index+1}}</div>
            <div class="right vux-1px-b">
                <p class="title">{{item.name}}</p>
                <p class="name"><x-icon type="ios-checkmark" size="14" class="itemNum-icon"></x-icon><span class="alname">{{item.al.name}}</span></p>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "songlist",
  props: {
    tracks: {
      type: Array
    }
  },
  components: {},
  data() {
    return {};
  },

  methods: {}
};
</script>
<style lang="less">
.vux-x-icon {
  fill: #99b4f3;
}
</style>

<style lang='less' scoped>
.sticky {
  display: flex;
  color: #555;
  position: sticky;
  top: 47px;
  background: #fff;
  z-index: 1000;
  .img {
    flex: 0 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .playall {
    flex: 1;
    padding: 10px 0;
    span {
      margin-left: 4px;
      font-size: 12px;
      color: #999;
    }
  }
}
.songList {
  .list-item {
    display: flex;
    color: #666;
    background: url("../../assets/PLAY.png") right center no-repeat;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 50px;
    }
    .right {
      padding: 7px 0;
      border-color: #666;
      flex: 1;
      .title {
        padding-bottom: 4px;
      }
      .name {
        font-size: 12px;
        color: #999;
        .itemNum-icon {
          vertical-align: middle;
          margin-right: 5px;
        }
        .alname {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
