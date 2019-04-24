

<script>
export default {
  name: 'xicon',
  props: {
    type: {
      type: String
    },
    size: {
      type: [Number, String],
      default: 14
    }
  },
  functional: true,
  render(h, ctx) {
    return h(
      'svg',
      {
        class: 'icon',
        attrs: {
          'aria-hidden': 'true'
        },
        style: {
          fontSize: ctx.props.size + 'px'
        }
      },
      [
        h('use', {
          attrs: {
            'xlink:href': `#icon-${ctx.props.type}`
          }
        })
      ]
    )
  }
}
</script>
