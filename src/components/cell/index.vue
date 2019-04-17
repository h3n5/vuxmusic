<template>
  <div class="cell" :class="className" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    isLink: Boolean,
    link: [String, Object]
  },
  computed: {
    className() {
      return {
        arrow: this.isLink
      }
    }
  },
  methods: {
    onClick() {
      if (this.link) {
        let obj = this.link
        if (typeof this.link === 'string') {
          obj = {
            path: this.link
          }
        }
        this.$router.push(obj)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.cell {
  padding: 10px;
}
.arrow {
  position: relative;
  &::after {
    content: ' ';
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }
}
</style>
