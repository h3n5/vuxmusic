import toast from './index.vue'
const plugin = {
  install(vue) {
    const instance = vue.extend(toast)
    const vm = new instance({ el: document.createElement('div') })
    document.body.append(vm.$el)
    const Toast = {
      show(options) {
        if (typeof options === 'string' || typeof options === 'number') {
          options = { text: options }
        }
        Object.assign(vm, options)
        vm.show = true
      },
      hide() {
        vm.show = false
      },
      clear() {
        if (vm) {
          vm.$el.parentNode.removeChild(vm.$el)
          vm.$destroy()
        }
      }
    }

    vue.prototype.$t = Toast
  }
}

export default plugin
