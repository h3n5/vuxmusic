<template>
  <div>
      <mHead title="账号" ></mHead>
        <div class="songList" >
            <div class="imgBox" :style="{backroundImage:user.avatarUrl}">
            </div>
            <div class="wordBox">
                <div class="left">
                    <p class="top">{{user.nickname || '未登录'}}</p>
                    <p class="level">Lv.5</p>
                </div>
                <div class="right">
                    <x-button   :disabled="isSign" :class="{'isSign':isSign,'botton':!isSign}" :mini="true" @click.native="isSign = true" v-text="isSign?'已签到':'签到'"></x-button>
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
import { Card, XButton } from "vux";
import mHead from "@/components/header-2";
import accoutList from "./AccountDetail/AccountList";
import { mapState } from "vuex";
export default {
  name: "accout",
  components: { mHead, Card, accoutList, XButton },
  data() {
    return {
      lists: [{ text: 1234, show: false }],
      isSign: false
    };
  },
  computed: {
    ...mapState("user", ["user"])
  },
  mounted() {
    this.add();
    this.add();
    this.add();
    this.add();
    this.add();
  },
  methods: {
    add() {
      this.lists.push({
        text: Math.floor(Math.random() * 10),
        show: false
      });
    },
    showBtn(e) {
      this.lists.find((v, i) => {
        return i === e;
      }).show = true;
    },
    hideBtn(e) {
      this.lists.find((v, i) => {
        return i === e;
      }).show = false;
    },
    delList(e) {
      this.lists.splice(e, 1);
    }
  }
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
  border-bottom: 1px dashed #dddee1;
  .imgBox {
    margin: 10px;
    position: relative;
    flex-basis: 60px;
    height: 60px;
    background: @maincolor;
    border-radius: 100%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .wordBox {
    flex: 7;
    display: flex;
    .left {
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
      .top {
        height: 65%;
      }
      .level {
        width: 50px;
        height: 35%;
        align-items: center;
        border: 1px solid #999;
        border-radius: 20px;
        padding: 0;
        margin-left: 5px;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-basis: 100px;
      .botton {
        color: #fe615c;
      }
      .sign {
        color: #999;
      }
    }
  }
}
</style>
