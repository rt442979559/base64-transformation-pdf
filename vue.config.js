/**
 * css —— 引入 全局变量、mixins、字体引用 scss文件
 */
// 可视化分析打包后的文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  publicPath: './', // 部署应用包时的基本 URL
  outputDir: 'dist', // 打包输出的文件夹名称
  assetsDir: 'static', // 静态文件存放地址
  devServer: {
    port: 1024,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false,

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/styles/variable.scss';
          @import '@/styles/mixins.scss';
          @import '@/styles/font.scss';
        `
      }
    }
  },
  configureWebpack: config => {
    return {
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            elementPlus: {
              name: `chunk-element`,
              test: /[\\/]node_modules[\\/]_?element-plus(.*)/,
              priority: 20
            },
            echarts: {
              name: 'chunk-echarts',
              test: /[\\/]node_modules[\\/]_?echarts(.*)/,
              priority: 25
            }
          }
        }
      }
    }
  }
}
