import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false;
Vue.use(ElementUI);
axios.defaults.baseURL="http://localhost:8081/api/";
Vue.prototype.$http=axios;

var proxy = require('http-proxy-middleware');
Vue.use(
    '/api',
    proxy({
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    })
);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
