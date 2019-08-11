// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 

// 引入代码高亮
// import hljs from 'highlight.js';
// import 'highlight.js/styles/vs2015.css' //样式文件

// Vue懒加载
import VueLazyload from 'vue-lazyload'
import store from "./store"

// 用cdn用引入这里就不需要写
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)


// 图片懒加载
Vue.use(VueLazyload,{
  preLoad: 0.9,
  attempt: 1
})


// 代码高亮自定义指令
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() =>{
      blocks.forEach((block)=>{
      hljs.highlightBlock(block)
      })
  }, 200)
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
