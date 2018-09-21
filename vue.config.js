const vuxLoader = require("vux-loader");
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')


module.exports = {
    configureWebpack: config => {
        vuxLoader.merge(config, {
            plugins: [
                "vux-ui",
                {
                    name: 'less-theme',
                    path: 'src/theme.less'
                },
                // new PrerenderSPAPlugin({
                //     staticDir: path.join(__dirname, 'dist'),
                //     // Required - Routes to render.
                //     routes: ['/', '/home', '/music', '/friend', '/accout'],
                // }),
                // inject skeleton content(DOM & CSS) into HTML
                new SkeletonWebpackPlugin({
                    webpackConfig: require('./webpack.skeleton.conf'),
                    quiet: true
                })
            ]
        });
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    }
};