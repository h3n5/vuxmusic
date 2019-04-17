<template>
  <button
    :style="buttonStyle"
    class="btn"
    :disabled="disabled"
    :type="actionType"
    @click="onClick"
  >
    <svg
      class="icon loading"
      aria-hidden="true"
      v-if="loading"
    >
      <use xlink:href="#icon-Loading"></use>
    </svg>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: 'vbutton',
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean,
    text: String,
    actionType: String,
    loading: Boolean,
    link: [String, Object],
    gradients: {
      type: Array,
      validator: function(val) {
        return val.length === 2
      }
    }
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        //   let obj = this.link
        //   if (typeof this.link === 'string') {
        //     obj = {
        //       path: this.link
        //     }
        //   }
        //   this.$router.push(obj)
        this.$emit('click')
      }
    }
  },
  computed: {
    noBorder() {
      return Array.isArray(this.gradients)
    },
    buttonStyle() {
      if (this.gradients) {
        return {
          background: `linear-gradient(90deg, ${this.gradients[0]}, ${
            this.gradients[1]
          })`,
          color: '#FFFFFF'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  color: #222;
  line-height: 2;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
  background-color: #ffffff;
  font-size: 14px;
  outline: none;
  border: none;
  &::after {
    content: ' ';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .loading {
    animation: rotate 1s linear infinite;
    font-size: 16px;
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>