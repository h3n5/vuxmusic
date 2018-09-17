<template>
  <div class="head">
    <div class="micro" ></div>
    <div class="search">
      <input type="text"  @click="goToSearch">
    </div>
    <div class="play" ></div>
  </div>
</template>
<script>
import { XHeader } from "vux";
export default {
  name: "tabbar",
  props:{
    showMicro:{
      type:Boolean,
      default:true
    }
  },
  components: {
    XHeader
  },
  methods:{
    goToSearch(){
      this.$router.push("/search")
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
    background: url("../assets/microphone-o.png") center no-repeat;
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
      border-radius: 5px;
      padding: 0 5px;
      color: #999999;
    }
  }
  .play {
    flex: 0 0 50px;
    height: 32px;
    background: url("../assets/lines.png") center no-repeat;
  }
}
</style>

