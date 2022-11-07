import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import './assets/styles/common.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQriously from 'vue-qriously'
import './assets/iconFont/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueQriously)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
