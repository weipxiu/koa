import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.use(ElementUI);

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:3000',  
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
