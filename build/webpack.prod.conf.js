const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')
module.exports = merge(webpackBaseConf, {
  devtool: 'source-map',             // 开启sourcemap
  mode: 'production',                       // 默认两种 production development,
})
