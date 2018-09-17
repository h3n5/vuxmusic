const vuxLoader = require("vux-loader");
module.exports = {
    configureWebpack: config => {
        vuxLoader.merge(config, {
            plugins: [
                "vux-ui",
                {
                    name: 'less-theme',
                    path: 'src/theme.less'
                }
            ]
        });
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    }
};