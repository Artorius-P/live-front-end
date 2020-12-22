import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'
import WebRTC from 'vue-webrtc'


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(WebRTC)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
