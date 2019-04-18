<template>
  <div class="Modal">
    <transition :name="maskTransition">
      <div class="mask" @click="show = false" v-show="show" :style="maskStyle"></div>
    </transition>
    <transition :name="modalTransition">
      <div class="modalClass" v-show="show" :style="modalStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'fade'
    },
    modalTransition: {
      type: String,
      default: 'fade'
    },
    maskStyle: {
      type: Object,
      default: () => ({
        zIndex: 1001
      })
    },
    modalStyle: {
      type: Object,
      default: () => ({
        zIndex: 1002
      })
    }
  },
  watch: {
    value(v) {
      this.show = v
    },
    show(v) {
      this.$emit('input', v)
    }
  },
  data() {
    return {
      show: false
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.Modal {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modalClass {
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 1002;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    margin: auto;
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
}
</style>
