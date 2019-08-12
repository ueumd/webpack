const fs = require('fs')

class EmitTemplate {
  constructor(options) {
    this.templateDir = options.template
    this.targetDir = options.filename
    this.params = options.params
  }

  apply(compiler) {
    compiler.hooks.compile.tap('emit', (compilation, callback) => {
      fs.readFile(this.templateDir, (err, data) => {
        console.log(data.toString())
        if (err) throw err
        let reg = new RegExp(`{{\\s*(${Object.keys(this.params).join('|')})\\s*}}`, 'g') // /{{\s*(title|name)\s*}}/g
        console.log(reg)
        let html = data.toString().replace(reg, (str, key, index) => {
          return this.params[key]
        })
        console.log('this.targetDir', this.targetDir)

        // 要注意目录创建，这里未实现
        fs.writeFile(this.targetDir, html, () => {
          console.info('[----------模版写入成功-------------]')
          if (callback) {
            callback()
          }
        })
      })
    })
  }
}

module.exports = EmitTemplate
