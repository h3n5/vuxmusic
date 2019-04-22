<template>
  <div class="action">
    <div class="mask" v-if="mask" v-show="show" @click="show = false"></div>
    <div class="actionlist">
      <slot name="header">
        <div class="title">{{title}}</div>
      </slot>
      <slot>
        <div class="listitem" v-for="(item, index) in items" :key="index">
          <div :class="{ selected:item.selected}">
            <p class="ellipsis">{{item.text}}</p>
          </div>
        </div>
      </slot>
      <slot name="footer">
        <div class="close" @click="show = false">{{close}}</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Actionsheet',
  props: {
    title: {
      type: String,
      default: 'Actionsheet'
    },
    close: {
      type: String,
      default: '关闭'
    },
    value: Boolean,
    list: Array,
    mask: {
      type: Boolean,
      default: true
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
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 998;
  background: #000;
  opacity: 0.3;
  transition: all 0.3s;
}
.action {
  background-color: #fff;
  .actionlist {
    .title,
    .close {
      padding: 10px;
      text-align: center;
    }
    .listitem {
      display: flex;
      flex-flow: column nowrap;
      .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
