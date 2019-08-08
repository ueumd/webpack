import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
const NoteBook = r => require.ensure([], () => r(require('../components/NoteBook.vue')), 'NoteBook')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/notebook',
      name: 'NoteBook',
      component: NoteBook
    }
  ]
})
