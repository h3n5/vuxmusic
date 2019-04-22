

<script>
export default {
  name: 'children',
  props: {
    list: {
      type: Array
    }
  },
  abstract: true,
  components: {},
  data() {
    return {}
  },
  render(h) {
    const child = {
      1: h('span', '1'),
      2: h('p', {}, '2'),
      3: h('div', {}, '3'),
      4: h('button', {}, '4')
    }
    return h(
      'div',
      {},
      this.list.map(v => {
        return child[v.type]
      })
    )
  },
  methods: {}
}
</script>

<style lang='less' scoped>
</style>
