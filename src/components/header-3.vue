<template>
  <div class="head">
    <div
      class="micro"
      @click="back"
    >
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-navigatebefore"></use>
      </svg>
    </div>
    <div class="search">
      <p>{{title}}</p>
    </div>
    <div
      class="play"
      @click="show = true"
    ></div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'tabbar',
  components: {},
  props: {
    title: String,
    showMicro: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    ...mapMutations('user', ['_user'])
  }
}
</script>
<style lang="less" scoped>
.dialog {
  .input {
    margin-bottom: 10px;
  }
  .btn {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 10px;
    .btn-item {
      margin-top: 0;
    }
  }
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #db2523;
  position: sticky;
  top: 0;
  height: 48px;
  z-index: 1111;
  > div {
    padding: 0 10px;
  }
  .micro {
    flex: 0 0 50px;
    height: 32px;
    font-size: 28px;
    color: #fff;
    // background: url("../assets/microphone-o.png") center no-repeat;
  }
  .search {
    flex: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background: url('../assets/lines.png') center no-repeat;
  }
}
</style>

