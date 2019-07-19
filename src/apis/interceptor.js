// 导入axios
import axios from 'axios'
// 导入框架
import Vue from 'vue'

// 超时时间设置
axios.defaults.timeout = 5000;
// 根据不同环境配置不同的地址
// 获取配置好的 .env.development和.env.production里配置好的的BASEURL
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// axios拦截器
// 请求拦截
axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
        return config;
});

// 响应拦截
axios.interceptors.response.use(response => {
            return response;
        },
    error => {
        if (error && error.response) {
            // 匹配状态码
            switch (error.response.status) {
                case 400:
                    console.log('错误请求');
                    break;
                case 401:
                    console.log('您没权限打开，请先登录获取权限');
                    break;
                case 403:
                    console.log('拒绝访问');
                    break;
                case 404:
                    console.log('请求错误，找不到该资源');
                    break;
                case 405:
                    console.log('请求方法不被允许');
                    break;
                case 408:
                    console.log('请求超时');
                    break;
                case 500:
                    console.log('服务器出错或你输入的内容错误');
                    break;
                case 501:
                    console.log('网络未实现');
                    break;
                case 502:
                    console.log('网络出错，请检查网络');
                    break;
                case 503:
                    console.log('服务不可用');
                    break;
                case 504:
                    console.log('网络超时');
                    break;
                case 505:
                    console.log('不支持该请求');
                    break;
                default:
                    console.log('链接错误，错误信息为：', error.response.status);
            }
        } else {
            // 其它状态
            console.log('发生未知错误,链接失败');
        }
        // 返回错误信息的promise回调
        return Promise.reject(error.response);
    }
);

// get请求封装
const get = function (url, params={}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params}).then(res => {
            resolve(res.data);
        })
    })
};

// post请求封装
const post = function (url, params={}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res.data);
        })
    })
};

const  interceptor = {
    get,
    post
};

// 配置到 react 组件原型上，调用时可以使用 this.$http
Vue.prototype.$http = interceptor;

// 导出
// export default interceptor;