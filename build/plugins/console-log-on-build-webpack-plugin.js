//console-log-on-build-webpack-plugin.js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler){
    compiler.hooks.run.tap(pluginName, compilation=>{
      console.info('[----------webpack构建过程开始-------------]')
    })
  }
}
module.exports = ConsoleLogOnBuildWebpackPlugin
