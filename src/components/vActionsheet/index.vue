<template>
  <div class="action">
    <transition name="fade">
      <div v-transfer-dom class="mask" v-if="mask" v-show="show"></div>
    </transition>
    <transition name="slide">
      <div class="actionlist" :class="{transform:!show}">
        <slot name="header">
          <div class="title">{{title}}</div>
        </slot>
        <slot>
          <div class="listitem" v-for="(item) in list" :key="item.id">
            <div :class="{ selected:item.selected}">
              <p class="ellipsis">{{item.text}}</p>
            </div>
          </div>
        </slot>
        <slot name="footer">
          <div class="close" @click="show = false">{{close}}</div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import TransferDom from '@/utils/directive/tranform.js'
export default {
  name: 'Actionsheet',
  directives: {
    TransferDom
  },
  props: {
    title: {
      type: String,
      default: 'Actionsheet1'
    },
    close: {
      type: String,
      default: '关闭'
    },
    value: Boolean,
    list: Array,
    mask: {
      type: Boolean,
      default: false
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
.slide-enter-active,
.slide-leave-active {
  max-height: 200px;
  transition: height 0.5s;
}
.slide-enter,
.slide-leave-to {
  height: 0;
}
.transform {
  transform: translateY(100%) !important;
}
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 998;
  background: #000;
  opacity: 0.3;
  top: 0;
}
.action {
  overflow: hidden;
  .actionlist {
    bottom: 0;
    width: 100%;
    transition: all 0.5s;
    max-height: 200px;
    transform: translateY(0);
    position: absolute;
    background-color: #fff;
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
