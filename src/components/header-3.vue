<template>
<div>
      <div class="head">
        <div class="micro"></div>
        <div class="search">
          <div class="headtitle">
            <p class="left"  :class="{'select':selected}"  @click="selected = true">动态</p>
            <p class="right" :class="{'select':!selected}"  @click="selected = false">附近</p>
          </div>
        </div>
        <div class="play"></div>
      </div>
      <div class="nav">
        <p class="left"><i class="iconfont icon-jita pr"></i>发动态</p>
        <p class="right" ><i class="iconfont icon-dianshiji pr"></i>发短视频</p>
      </div>
</div>
</template>
<script>
import { XHeader } from "vux";
export default {
  name: "tabbar",
  components: {
    XHeader
  },
  props:{
    title:String
  },
  data() {
    return {
      selected:true
    };
  },
  watch:{
    selected(){
      this.$emit("left",this.selected)
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #db2523;
  > div {
    padding: 0 10px;
  }
  .micro {
    flex: 0 0 50px;
    height: 32px;
    background: url("../assets/microphone-o.png") center no-repeat;
  }
  .search {
    flex: auto;
    height: 100%;
    .headtitle{
      padding: 0px 40px;
      display: flex;
      p {
        text-align: center;
        padding: 5px 10px;
        color: #fff;
        flex: 1;
        border: 1px solid #999;
      }
      .left{
        border-right: none;
      }
      .select{
        background-color: #222;
        color: #fff;
      }
    }
  }
  .play {
    flex: 0 0 50px;
    height: 32px;
    background: url("../assets/lines.png") center no-repeat;
  }
}
    .nav{
      display: flex;
      padding: 10px 0;
      p {
        text-align: center;
        flex: 1;
      }
      .pr{
        padding-right: 5px;
      }

    }
</style>

