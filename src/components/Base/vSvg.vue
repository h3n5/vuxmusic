<template>
  <svg class="icon-font" aria-hidden="true">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>
<script>
export default {
  name: "vSvg",
  props: {
    icon: {
      type: String
    }
  }
};
</script>
<style lang="less" scope>
.icon-font {
  width: 24px;
  height: 24px;
  fill: @svgcolor;
  overflow: hidden;
}
</style>