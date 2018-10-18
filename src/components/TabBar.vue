<template>
  <div class="head">
    <div class="micro">
      <div class="avatar" @click="goto('/accout')">
        <img :src="imgurl" alt="avatar" >
      </div>
    </div>
    <div class="search">
      <input type="text"  @click="goto('/search')">
    </div>
    <div class="play" @click="goto('/play')">
        <linescroll></linescroll>
    </div>
  </div>
</template>
<script>
import { XHeader } from "vux";
import linescroll from "@/components/anime/linescroll";
import { mapState } from "vuex";
export default {
  name: "tabbar",
  props: {
    showMicro: {
      type: Boolean,
      default: true
    }
  },
  components: {
    XHeader,
    linescroll
  },
  computed: {
    ...mapState("user", ["user"]),
    imgurl() {
      return this.user.avatarUrl ? this.user.avatarUrl : "@/assets/123.jpg";
    }
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
  height: 60px;
  padding: 15px;
  background: #db2523;
  > div {
    padding: 0 10px;
  }
  .micro {
    flex: 0 0 50px;
    height: 40px;
    width: 40px;
    padding: 0 5px;
    .icon {
      height: 100%;
      width: 100%;
      color: #fff;
    }
    .avatar {
      height: 100%;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
        border-radius: 100%;
      }
    }
  }
  .search {
    flex: auto;
    height: 100%;
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
    flex: 0 0 50px;
    height: 32px;
    // background: url("../assets/lines.png") center no-repeat;
    position: relative;
  }
}
</style>

