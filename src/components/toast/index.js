import toast from './index.vue'
const plugin = {
  install(vue) {
    const instance = vue.extend(toast)
    const vm = new instance({ el: document.createElement('div') })
    document.body.append(vm.$el)
    const Toast = function() {
      return function(options) {
        if (typeof options === 'string' || typeof options === 'number') {
          options = { text: options }
        }
        Object.assign(vm, options)
        vm.show = true
      }
    }
    Toast.prototype.hide = function() {
      vm.show = false
    }
    Toast.prototype.clear = function() {
      if (vm) {
        vm.$el.parentNode.removeChild(vm.$el)
        vm.$destroy()
      }
    }
    vue.prototype.$toast = new Toast()
  }
}

export default plugin
