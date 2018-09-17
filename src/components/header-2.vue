<template>
  <div class="head">
    <div class="micro" v-if="showMicro"></div>
    <div class="search">
      <p>{{title}}</p>
    </div>
    <div class="play"></div>
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
    title:String,
    showMicro:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {};
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
    p {
      text-align: center;
      height: 20px;
      line-height: 20px;
      color: #fff;
    }
  }
  .play {
    flex: 0 0 50px;
    height: 32px;
    background: url("../assets/lines.png") center no-repeat;
  }
}
</style>

