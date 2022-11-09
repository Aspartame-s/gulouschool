const { postcss } = require('postcss-px2rem');
const port = process.env.port || process.env.npm_config_port || 80 // 端口
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
  }
module.exports = {
    lintOnSave: false, // 当保存时不进行eslint的检查
    devServer:{
        port: port,
        host: '0.0.0.0',
        open:false, //自动打开默认浏览器
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://192.168.1.100:10002`,
                changeOrigin: true,
                pathRewrite: {
                  ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 144
                    }),
                    postcss
                ]
            },
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v9 中，这个选项名是 "additionalData" v7中这个选项名是data
                prependData: `@import "@/assets/styles/common.scss";`
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
          .set('@', resolve('src'))
          .set('@assets',resolve('src/assets'))
          .set('@components',resolve('src/components'))
          .set('@network',resolve('src/network'))
          .set('@router',resolve('src/router'))
          .set('@store',resolve('src/store'))
          .set('@views',resolve('src/views'))
      }
}