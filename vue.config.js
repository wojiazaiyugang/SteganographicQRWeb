const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 输出文件目录
    outputDir: 'docs',
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    publicPath: '/',
    lintOnSave: false,
    devServer: {
        // can be overwritten by process.env.HOST
        host: '0.0.0.0',
        port: 8080
    },

    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('vue$', 'vue/dist/vue.esm.js');

        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true
            })
    },
    css: {
        // css预设器配置项
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/css/style.scss";`
            },
        },
    },
    configureWebpack: {
        node: {
            process: true,
        },
    }
};
