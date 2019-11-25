/**
 * 入口js
 */
import Vue from 'vue'
import App from './App.vue'
import './base.css'

/* 只对当前文件有效 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />'
})
