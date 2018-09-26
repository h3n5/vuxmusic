<template>
  <div class="head">
    <div class="micro">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-micnone"></use>
      </svg>
    </div>
    <div class="search">
      <input type="text"  @click="goToSearch">
    </div>
    <div class="play" @click="gotoPlay">
        <linescroll></linescroll>
    </div>
  </div>
</template>
<script>
import { XHeader } from "vux";
import linescroll from '@/components/anime/linescroll';
export default {
  name: "tabbar",
  props:{
    showMicro:{
      type:Boolean,
      default:true
    }
  },
  components: {
    XHeader,linescroll
  },
  methods:{
    goToSearch(){
      this.$router.push("/search")
    },
    gotoPlay(){
      this.$router.push("/play")
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
    height: 32px;
    .icon{
      height: 100%;
      width: 100%;
      color:#fff;
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

