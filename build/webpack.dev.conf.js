const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')
module.exports = merge(webpackBaseConf, {
  devtool: 'inline-source-map',             //开启sourcemap
  mode: 'development',                      // 默认两种 production development,
  devServer: {                              // 开发服务器的配置
    port: 3000,
    progress: false,
    contentBase: path.resolve(__dirname, 'dist'), //静态文件根目录
    compress: true
  }
})
