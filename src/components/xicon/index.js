import xicon from './index.vue'
const install = function(Vue) {
  Vue.component('x-icon', Vue.extend(xicon))
}
export default install
