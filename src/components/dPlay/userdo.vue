<template>
  <div
    class="userdo"
    v-show="!showLyric"
  >
    <div
      class="item"
      :class="{love:love,loved:!love}"
      @click="love =!love"
    >
    </div>
    <div class="item download">
    </div>
    <div class="item comment">
    </div>
    <div class="item more">
    </div>
  </div>
</template>

<script>
export default {
  name: 'userdo',
  props: {
    showLyric: Boolean
  },
  data() {
    return {
      love: false,
      download: false,
      comment: false
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.userdo {
  display: flex;
  flex-basis: 60px;
  padding: 10px 0;
  margin: 15px 30px;
  .item {
    flex: 1;
    display: flex;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    color: #ffffff;
  }
  .love {
    background: url('../../assets/icon/love.png') center / 40px 40px no-repeat;
  }
  .loved {
    background: url('../../assets/icon/loved.png') center / 40px 40px no-repeat;
  }
  .download {
    background: url('../../assets/icon/download.png') center / 40px 40px
      no-repeat;
  }
  .comment {
    background: url('../../assets/icon/comment.png') center / 40px 40px
      no-repeat;
  }
  .more {
    background: url('../../assets/icon/more.png') center / 40px 40px no-repeat;
  }
}
</style>
