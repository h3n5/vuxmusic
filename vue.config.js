const vuxLoader = require("vux-loader");
module.exports = {
    devServer: {
        host: '0.0.0.0',
        // disableHostCheck: true,
    },
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
    }
};