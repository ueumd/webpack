const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtracPlugin = require('mini-css-extract-plugin')                 // 抽离CSS插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')  // 压缩CSS
const UglifyJs = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

//console-log-on-build-webpack-plugin.js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler){
    compiler.hooks.run.tap(pluginName, compilation=>{
      console.info('[----------webpack构建过程开始-------------]')
    })
  }
}

module.exports = {
  entry: './src/js/app.js',                   // 入口
  output: {
    path: path.resolve(__dirname, '../dist'),  // 路径必须是一个绝对路径 path.resolve(__dirname, 'dist')
    filename: 'js/bundle.[hash:8].js'         // 打包后的文件名
  },
  optimization: {
    minimizer: [
      new UglifyJs({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: true,                     // 防止缓存
      minify: {                       // 压缩
        removeAttributeQuotes: true,  // 去掉引号
        removeComments: true,         // 移除 HTML 中的注释
        collapseWhitespace: true,     // 删除空白符与换行符
        minifyCSS: true               // 压缩内联 css
      }
    }),
    new MiniCssExtracPlugin({
      filename: 'css/app.[hash:8].css'
    }),
    new CopyWebpackPlugin([
      {from:__dirname+'/src/images', to:__dirname+'/dist/images'}
    ]),
    // 压缩CSS
    new OptimizeCSSAssetsPlugin({}),
    new ConsoleLogOnBuildWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: "babel-loader",   // es6 => es5
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtracPlugin.loader,
            // options: {
            //   publicPath: '../'
            // }
          },
          'css-loader'  // 解析 @import url
        ],
        // use: [
        //   MiniCssExtracPlugin.loader,
        //   'css-loader'  // 解析 @import url
        // ],
        exclude: /node_modules/
      },
      {
        test: /.sass$/,
        use: [
          MiniCssExtracPlugin.loader,
          'css-loader?minimize',
          'less-loader'
        ],
        include: resolve(__dirname, 'src'), // 限制范围，提搞打包速度
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '../images/',       // CSS 打包路径问题
              limit: 20000                    // 把小于 20kb 的文件转成 Base64 的格式
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/'       // CSS 打包路径问题
            }
          }
        ]
      }
    ]
  }
}
