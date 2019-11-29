/*
入口JS
*/
import Vue from 'vue'
import router from './router'
import App from './App.vue'
// import '../static/css/bootstrap.css'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />',
  router
})

