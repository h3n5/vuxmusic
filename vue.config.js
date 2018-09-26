const vuxLoader = require("vux-loader");
const path = require("path");
const merge = require("webpack-merge");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");

module.exports = {
    configureWebpack: config => {
        vuxLoader.merge(config, {
            plugins: [
                "vux-ui",
                {
                    name: "less-theme",
                    path: "src/theme.less"
                },
                {
                    name: 'duplicate-style',
                    events: {
                        done: function () {
                            console.log('done!')
                        }
                    }
                }
            ]
        });
        merge(config, {
            plugins: [
                new SkeletonWebpackPlugin({
                    webpackConfig: require("./src/skeleton/webpack.skeleton.conf"),
                    quiet: true
                })
            ]
        })
    }
};