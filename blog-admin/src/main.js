// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"


// 引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// 全局引入axios
import axios from 'axios'
import Vueaxios from 'vue-axios'
import axiosSet from "./assets/js/axiosSet"
axiosSet();
Vue.use(Vueaxios, axios)

// 引入qs
import qs from "qs";
Vue.prototype.$qs = qs;

Vue.config.productionTip = false
/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default vue;
