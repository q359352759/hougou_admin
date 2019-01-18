import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters


Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})


import axios from "axios";
axios.defaults.baseURL =  process.env.BASE_API;
axios.defaults.timeout = 60000;
//拦截器
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if(error){
            if (error.response) {
                return error.response;
            }
        }
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
);
Vue.prototype.$axios = axios;

import qs from "qs";
Vue.prototype.$qs = qs;


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
