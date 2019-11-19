<template>
  <div class="head">
    <slot name="left">
      <div class="micro">
        <div class="avatar" @click="goto('/accout')">
          <img v-if="user.avatarUrl" :src="user.avatarUrl" alt="avatar" />
          <vSvg v-else icon="icon-accountcircle" />  
        </div>
      </div>
    </slot>
    <slot name="center">
      <div class="search" @click="goto('/search')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search" />
        </svg>
        <span class="fz14 ellipsis">{{search}}</span>
      </div>
    </slot>
    <slot name="right">
      <skin class="right-skin" />
      <div class="play" @click="$router.push(`/play/${audio.id}`)">
        <linescroll></linescroll>
      </div>
    </slot>
  </div>
</template>
<script>
import linescroll from "@/components/anime/linescroll";
import { mapState } from "vuex";
import skin from "./skin";
export default {
  name: "vhead",
  props: {
    showMicro: {
      type: Boolean,
      default: true
    }
  },
  components: {
    linescroll,
    skin
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("music", ["audio", "search"])
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 7px 9px;
  background: @maincolor;
  .micro {
    flex: 0 0 auto;
    width: 40px;
    padding: 0 5px;
    line-height: 40px;
    .avatar {
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 100%;
        width: 100%;
        border-radius: 100%;
      }
    }
    .icon {
      height: 100%;
      width: 100%;
      color: #fff;
    }
  }
  .search {
    display: flex;
    flex: auto;
    height: 100%;
    align-items: center;
    background-color: rgba(221, 221, 221, 0.37);
    border-radius: 15px;
    padding: 0 10px;
    margin: 0 10px;
    color: #ddd;
    .icon {
      margin: 0 5px;
      color: #fff;
      opacity: 0.37;
      font-size: 16px;
    }
    .fz14 {
      font-size: 14px;
    }
    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: #dddddd;
      border-radius: 15px;
      padding: 0 5px;
      color: #999999;
    }
  }
  .play {
    flex: 0 0 40px;
    height: 32px;
    position: relative;
  }
}
</style>