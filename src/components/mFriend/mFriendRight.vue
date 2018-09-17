<template>
<div class="bgg">
  <div class="page" v-for="(item, index) in list" :key="index">
      <div class="audio">
          <img src="@/assets/123.jpg" alt="">
          <div class="mask">
              <p>infomation</p>
          </div>
      </div>
      <div class="item">
          <div class="top">
              <div class="left"></div>
              <div class="content"></div>
              <div class="right"></div>
          </div>
          <div class="bottom"></div>
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
.page{
    padding: 0 10px;
    .audio{
        position: relative;
        margin: 10px 0;
        img{
            height: 200px;
            width: 100%;
        }
        .mask{
            position: absolute;
            top: 170;
            left: 0;
            right: 0;
            bottom: 5px;
            background-color: rgba(0, 0, 0, .4);
            p{
                color: #fff;
                padding: 10px 5px;
            }
        }
    }
    .item{
        display: flex;
        .left{
            height: 40px;
            width: 40px;
            margin: 0 10px;
            border-radius: 40px;
            background: url("../../assets/logo.png") center no-repeat;
        }
        .contetn{
            flex-basis: 1 1 auto;
            height: 200px;
        }
        .right{
            flex-basis: 40px;
        }
    }
}
</style>
