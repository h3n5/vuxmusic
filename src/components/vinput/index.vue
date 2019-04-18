

<script>
export default {
  name: 'vinput',
  abstract: true,
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    placeholder: String,
    value: [String, Number],
    readonly: Boolean,
    disabled: Boolean,
    keyboard: String,
    isType: [String, Function],
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  computed: {
    uuid() {
      return this._uid
    },
    attr() {
      return {
        autocomplete: this.autocomplete,
        placeholder: this.placeholder,
        readonly: this.readonly,
        disabled: this.disabled,
        name: this.name
      }
    },
    event() {
      return {
        focus: this.focus,
        blur: this.blur,
        input: this.input
      }
    }
  },
  watch: {
    value: {
      handler(v) {
        this.currentValue = v
      },
      immediate: true
    }
  },
  data() {
    return {
      currentValue: '',
      onfocus: false
    }
  },
  methods: {
    focus(e) {
      this.onfocus = true
      this.$emit('focus', this.currentValue, e)
      this.$refs.input.focus()
    },
    blur(e) {
      this.onfocus = false
      this.$emit('blur', this.currentValue, e)
      this.$refs.input.blur()
    },
    input(e) {
      this.$emit('input', e.target.value)
    }
  },
  render(h) {
    const children = []
    if (this.label) {
      children.push(
        h('div', { class: 'vlabel' }, [
          h('label', { attrs: { for: this.uuid } }, this.label)
        ])
      )
    }
    const type = this.type === 'textarea' ? 'textarea' : 'input'
    children.push(
      h('div', { class: 'vcell' }, [
        h(type, {
          ref: 'input',
          class: 'v-input',
          attrs: {
            id: this.uuid,
            type: this.type,
            ...this.attr
          },
          domProps: {
            value: this.currentValue
          },
          on: {
            ...this.event
          }
        }),
        this.onfocus && this.currentValue && this.showClear
          ? h(
              'div',
              {
                class: 'vicon',
                on: {
                  click: () => {
                    this.currentValue = ''
                    this.$emit('input', this.currentValue)
                  }
                }
              },
              [
                h('svg', { class: 'icon', attrs: { 'aria-hidden': 'true' } }, [
                  h('use', { attrs: { 'xlink:href': '#icon-Closewithcircle' } })
                ])
              ]
            )
          : null
      ])
    )
    return h('div', { class: 'inputbox' }, children)
  }
}
</script>

<style lang='less' scoped>
.inputbox {
  display: flex;
  flex-flow: row nowrap;
  font-size: 14px;
  padding: 10px 15px;
  .vlabel {
    display: flex;
    flex: 0 0 60px;
    align-items: center;
    justify-content: center;
  }
  .vcell {
    flex: 1;
    position: relative;
    display: flex;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    color: #323233;
    font-size: 14px;
    background-color: #fff;
    .vicon {
      display: flex;
      flex: 0 0 auto;
      justify-content: center;
      align-items: center;
      padding: 0 4px;
      font-size: 16px;
      color: #999;
    }
    .v-input {
      margin: 0;
      padding: 0;
      width: 100%;
      resize: none;
      display: block;
      color: #323233;
      box-sizing: border-box;
      background-color: transparent;
      text-shadow: none;
      outline: none;
      border: none;
    }
  }
}
</style>
