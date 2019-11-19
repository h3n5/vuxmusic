<template>
  <div v-transfer-dom class="action" :style="{position: show ? 'static' :'relative'}">
    <transition name="fade">
      <div v-transfer-dom class="mask" v-if="mask" v-show="show" @click="show = false"></div>
    </transition>
    <transition name="slide">
      <div class="actionlist" :class="{transform:!show}">
        <slot name="header">
          <div v-if="$slots.header" class="title">{{title}}</div>
        </slot>
        <slot>
          <div class="actioncontent">
            <div
              class="listitem"
              :class="{ selected: item.id == id}"
              v-for="(item) in list"
              :key="item.id"
              @click="$emit('click',item)"
            >
              <div class="songitem vux-1px-b">
                <p class="ellipsis">{{item.name}} - {{item.artists[0].name}}</p>
              </div>
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
import TransferDom from "@/utils/directive/tranform.js";
export default {
  name: "Actionsheet",
  directives: {
    TransferDom
  },
  props: {
    title: {
      type: String,
      default: "歌单"
    },
    close: {
      type: String,
      default: "关闭"
    },
    value: Boolean,
    id: Number,
    list: Array,
    mask: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(v) {
      this.show = v;
    },
    show(v) {
      this.$emit("input", v);
    }
  },
  data() {
    return {
      show: false
    };
  },

  methods: {}
};
</script>

<style lang='less'>
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
  position: relative;
}
.actionlist {
  bottom: 0;
  width: 100%;
  transition: all 0.5s;
  transform: translateY(0);
  position: absolute;
  background-color: #fff;
  z-index: 999;
  .title,
  .close {
    padding: 10px;
    text-align: center;
    border-top: 1px solid #eee;
  }
  .actioncontent {
    max-height: 300px;
    overflow-y: scroll;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .listitem {
      display: flex;
      flex-flow: column nowrap;
      .songitem {
        padding: 10px 0px;
        margin: 0 10px;
      }
      .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .selected {
      color: @maincolor;
    }
  }
}
</style>
