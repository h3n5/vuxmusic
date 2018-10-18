<template>
  <div class="display">
    <div class="top">
        <div class="img"><img :src="coverImgUrl" alt="coverImgUrl"></div>
        <div class="message">
            <p class="name">{{name}}</p>
            <div class="avata"><img :src="creator.avatarUrl" alt="avatarUrl"><span>{{creator.nickname}}</span></div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "display",
  components: {},
  props: {
    creator: {
      type: Object
    },
    coverImgUrl: {
      type: String
    },
    name: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["user"])
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.display {
  background: rgba(0, 0, 0, 0.7);
  .top {
    display: flex;
    flex-flow: row nowrap;
    padding: 15px 10px;
    .img {
      flex: 0 0 100px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .message {
      padding: 10px;
      flex: 1;
      .name {
        color: #fff;
      }
      .avata {
        height: 40px;
        img {
          height: 20px;
          width: 20px;
          border-radius: 20px;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          display: inline-block;
          height: 100%;
          line-height: 40px;
          padding-left: 5px;
          color: #fff;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
