import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'u-reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './apis/interceptor'
import './apis'
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
  console.log("to",to,'from',from);
  if(to.path==="/Login"){
      next();
  }else{
    // 如果不是到登录页面，则需要判断是否已经登录，没有登录则跳转到登录页面，
    // 从localStorage里获取token,如果有token则跳转
    var token = localStorage.getItem("token");
    console.log("token",token);
    if(token){
        next();
    }else{
      next({path:'/Login',query:{redirector:to.path}})
      
    }
  }
  // next();
})

console.log(process.env)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
