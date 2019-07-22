import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './apis'
import './apis/interceptor'
import 'u-reset.css'
import '@/mixin'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next();
    } else {
        // 如果不是到登录页面，则需要判断是否已经登录，没有登录则跳转到登录页面，
        // 从localStorage里获取token,如果有token则跳转
        let token = localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next({name: 'login', params: {redirect: to.name}});
        }
    }
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
