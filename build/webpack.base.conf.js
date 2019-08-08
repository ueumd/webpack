const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')                 // 抽离CSS插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')  // 压缩CSS
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),    // 路径必须是一个绝对路径 path.resolve(__dirname, 'dist')
    filename: 'static/js/bundle.[hash:8].js',    // 打包后的文件名
    chunkFilename: 'static/js/chunk.[hash:8].js' // 动态导入时chunkFilename默认情况是数字，0,1....; 0.bundle.717e4ab9.js
  },
  optimization: {
    minimizer: [
      new UglifyJsWebpackPlugin({
        uglifyOptions: {
          beautify: false, // 最紧凑的输出
          comments: false, // 删除所有的注释
          compress: {
            // drop_console: true, // console
            drop_debugger: false,
            // pure_funcs: ['console.log'] // 移除console
          }
        }
      })
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
      filename: 'static/css/app.[hash:8].css',
      chunkFilename: 'static/css/chunk.[hash:8].css'
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'static/images/',
              publicPath: '../images/',
              limit: 20000
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
          loader: 'babel-loader'   // es6 => es5
        }
      }
    ]
  }
}
