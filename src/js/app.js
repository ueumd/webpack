require('../css/app.css')
console.log(123)
document.getElementById('app').innerHTML = "这是我第一个打包成功的程序"
let h2 = document.createElement("h2")
h2.innerHTML = "不是吧，那么快第二个打包程序啦 <div class='bg'></div>"
document.body.appendChild(h2)
console.log(456)

const alertMe = (msg) => {
  console.log(msg)
}
class Robot {
  constructor (msg) {
    this.message = msg
  }
  say () {
    alertMe(this.message)
  }
}
const marvin = new Robot('hello babel')
marvin.say()
