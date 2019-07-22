import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: '/home'},
        {
            path: '/home',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'system',
                    name: 'system',
                    component: () => import(/* webpackChunkName: "system" */ './components/home/system.vue'),
                    children: [
                        {
                            path: 'admin',
                            name: 'admin',
                            component: () => import(/* webpackChunkName: "admin" */ './components/home/system/admin.vue'),
                        },
                        {
                            path: 'permission',
                            name: 'permission',
                            component: () => import(/* webpackChunkName: "permission" */ './components/home/system/permission.vue'),
                        },
                        {
                            path: 'role',
                            name: 'role',
                            component: () => import(/* webpackChunkName: "system" */ './components/home/system/role.vue'),
                        }
                    ]
                },
                {
                    path: 'daily',
                    name: 'daily',
                    component: () => import(/* webpackChunkName: "daily" */ './components/home/daily.vue')
                },
                {
                    path: 'message',
                    name: 'message',
                    component: () => import(/* webpackChunkName: "message" */ './components/home/message.vue')
                },
                {
                    path: 'music',
                    name: 'music',
                    component: () => import(/* webpackChunkName: "music" */ './components/home/music.vue')
                },
                {
                    path: 'musicType',
                    name: 'musicType',
                    component: () => import(/* webpackChunkName: "musicType" */ './components/home/musicType.vue')
                },
                {
                    path: 'weChat',
                    name: 'weChat',
                    component: () => import(/* webpackChunkName: "weChat" */ './components/home/weChat.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
        }
    ]
})
