const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const isPro = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  },
  configureWebpack: {
    plugins: isPro
      ? [
          new webpack.BannerPlugin({
            banner: new Date().toString(), // 其值为字符串，将作为注释存在
            raw: false, // 如果值为 true，将直出，不会被作为注释
            entryOnly: false, // 如果值为 true，将只在入口 chunks 文件中添加
            test: /\.js$/
          }),
          new CompressionPlugin({
            test: /\.js(\?.*)?$|\.css$/i
          })
        ]
      : []
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/css/theme.less')]
    })
}
