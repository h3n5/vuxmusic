<template>
  <div>
      <mHead title="账号" ></mHead>
        <div class="songList" >
            <div class="imgBox"></div>
            <div class="wordBox">
                <div class="left">
                    <p class="top">XXXXXXXXX</p>
                    <p class="level">Lv.5</p>
                </div>
                <div class="right">
                    <p class="botton">签到</p>
                </div>
            </div>
        </div>
	    <card>
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                    <p>动态</p>
                    <span>1130</span>
                </div>
                <div class="vux-1px-r">
                    <p>关注</p>
                    <span>1130</span>
                </div>
                <div class="vux-1px-r">
                    <p>粉丝</p>
                    <span>1130</span>
                </div>
                <div class="vux-1px-r">
                    <p class="data">我的资料</p>
                </div>
            </div>
        </card>
        <accoutList></accoutList>
  </div>
</template>

<script>
import { Card } from "vux";
import mHead from "@/components/header-2";
import accoutList from '@/components/mAccout/mAccoutList';
export default {
  name: "",
  components: { mHead, Card,accoutList },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang='less' scoped>
@import "~vux/src/styles/1px.less";
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.data {
  height: 100%;
  line-height: 30px;
}
.vux-1px-r {
  p {
    padding-bottom: 5px;
  }
}
.ellipsis(@num) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @num;
}
.songList {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 10px;
  padding: 10px;
  .imgBox {
      margin: 10px;
    position: relative;
    flex-basis: 60px;
    border-radius: 60px;
    height: 60px;
    background: url("../assets/logo.png")center no-repeat;
  }
  .wordBox {
    flex: 7;
    display: flex;
    .left{
        flex: 1 1 auto;
        padding: 10px 0;
        p {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 5px;
            text-align: center;
            font-size: 14px;
            .ellipsis(1);
        }
        .top{
            height: 65%;
        }
        .level{
            width: 50px;
            height: 35%;
            align-items: center;
            border: 1px solid #999;
            border-radius: 20px;
            padding: 0;
            margin-left: 5px;
        }
    }
    .right{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: 100px;
        .botton{
            padding: 10px 20px;

        }
    }

  }
}
</style>
