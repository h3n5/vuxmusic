import Vue from 'vue'

const files = require.context('../Base', true, /\.vue$/i)

files
  .keys()
  .map(files)
  .forEach(v => {
    Vue.component(v.default.name, v.default)
  })
