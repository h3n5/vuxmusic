<template>
<div class="bgg">
  <div class="page" v-for="(item, index) in list" :key="index">
    <div class="pic">
      <div class="bgpic"></div>
    </div>
    <div class="content">
      <div class="top">
        <div class="left">
          <p class="name">EMT</p>
          <p class="time">2012-12-12</p>
        </div>
        <div class="right">
          <div class="button">关注</div>
        </div>
      </div>
      <div class="av">
        <p class="title">一个图片</p>
        <div class="audio"><img src="@/assets/123.jpg" alt="" srcset=""></div>
        <p class="info">这是介绍</p>
      </div>
      <div class="bottom">
        <div class="item">点赞</div>
        <div class="item">评论</div>
        <div class="item">转发</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "",
  props: { 
    list: Array
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang='less' scoped>
.bgg{
  background-color: #f0f0f0;
}
.page {
  display: flex;
  background-color: #fff;
  margin-bottom: 15px;
  padding: 5px 0;
  .pic {
    flex-basis: 60px;
    .bgpic {
      height: 40px;
      width: 40px;
      margin: 0 10px;
      border-radius: 40px;
      background: url("../../assets/logo.png") center no-repeat;
    }
  }
  .content {
    flex: 1 1 auto;
    .top {
      display: flex;
      .left {
        flex: 1 1 auto;
        > p {
          margin: 10px 0;
        }
      }
      .right {
        flex-basis: 100px;
        margin-top: 10px;
        .button {
          height: 30px;
          text-align: center;
          line-height: 30px;
          width: 80px;
          margin: auto;
          border: 1px solid #999;
          background-color: #999;
        }
      }
    }
    .av {
      .title {
        padding-bottom: 10px;
      }
      .audio {
        height: 300px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .info {
        padding: 10px 0;
      }
    }
    .bottom {
      display: flex;
      .item {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
