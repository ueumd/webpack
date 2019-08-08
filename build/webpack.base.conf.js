const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')                 // 抽离CSS插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')  // 压缩CSS
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),  // 路径必须是一个绝对路径 path.resolve(__dirname, 'dist')
    filename: 'static/js/bundle.[hash:8].js'  // 打包后的文件名
  },
  optimization: {
    minimizer: [
      new UglifyJsWebpackPlugin({})
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      hash: true,                     // 防止缓存
      minify: {                       // 压缩
        removeAttributeQuotes: true,  // 去掉引号
        removeComments: true,         // 移除 HTML 中的注释
        collapseWhitespace: true,     // 删除空白符与换行符
        minifyCSS: true               // 压缩内联 css
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/app.[hash:8].css'
    }),
    // 压缩CSS
    new OptimizeCSSAssetsPlugin({})
    /*
    new CopyWebpackPlugin([
       {from:__dirname+'/src/images', to:__dirname+'/dist/images'}
     ]),
   */
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'static/images/',
              publicPath: '../images/',       // CSS 打包路径问题
              limit: 20000                    // 把小于 20kb 的文件转成 Base64 的格式
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js/,
        use: {
          loader: "babel-loader"   // es6 => es5
        }
      }
    ]
  }
}
