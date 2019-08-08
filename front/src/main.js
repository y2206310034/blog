// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import store from "./store"

// 引入代码高亮
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css' //样式文件
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() =>{
      blocks.forEach((block)=>{
      hljs.highlightBlock(block)
      })
  }, 200)
})



Vue.use(ElementUI)
Vue.use(VueLazyload,{
  preLoad: 0.9,
  attempt: 1
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
