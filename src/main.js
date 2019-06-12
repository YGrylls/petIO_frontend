import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
});

axios.defaults.baseURL="http://47.101.189.30:8081/api/";
axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;

var proxy = require('http-proxy-middleware');
Vue.use(
    '/api',
    proxy({
        target: 'http://47.101.189.30:8081',
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
