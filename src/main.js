import Vue from 'vue'
import App from './App.vue'

// import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
// Vue.use(VueRouter)
// Vue.use(VueResource)
//
// export const router = new VueRouter()
//
// router.map({
//   '/home': {
//     component: App
//   },
//   '/login': {
//     component: App
//   },
//   '/signup': {
//     component: App
//   },
//   '/about': {
//     component: App
//   }
// })
//
// router.redirect({
//   '*': '/home'
// })
//
// router.start(App, '#app')

new Vue({
  el: '#app',
  render: h => h(App)
})
