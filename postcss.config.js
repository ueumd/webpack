// module.exports = {
//     plugins: [
//         require('autoprefixer')({
//             browsers: ['ie >= 9']
//         }),
//         require('cssnano')
//     ]
// }

//允许你使用未来的 CSS 特性。
// const postcssPresetEnv = require('postcss-preset-env')
// 自动添加浏览器前缀
const autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [
    // postcssPresetEnv,
    autoprefixer()
  ]
}