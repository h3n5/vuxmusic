<template>
  <div class="toast">
    <div class="mask" v-if="mask"></div>
    <transition name="fade" v-if="show">
      <div class="text">
        <i class v-show="false"></i>
        <slot>
          <p class="content">{{text}}</p>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    mask: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    },
    value: {
      type: Boolean
    },
    time: {
      type: Number,
      default: 2000
    },
    success: {
      type: Function,
      default: null
    },
    fail: {
      type: Function,
      default: null
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.mask = false
          this.$emit('input', false)
        }, this.time)
      } else {
        if (this.success) {
          this.success()
        }
        if (this.fail) {
          this.fail()
        }
      }
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style lang='less' scoped>
.toast {
  position: relative;
  .text {
    font-size: 14px;
    z-index: 1000;
    position: fixed;
    width: 7.6em;
    top: 180px;
    left: 50%;
    margin-left: -3.8em;
    background: hsla(0, 0%, 7%, 0.7);
    text-align: center;
    border-radius: 25px;
    color: #fff;
    .content {
      padding: 8px 0;
    }
  }
  .mask {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
