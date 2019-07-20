<template>
    <div class="home">
        <el-container class="home-el-container">
            <el-aside :width="isCollapse ? '101px' : '201px'">
                <el-menu default-active="admin"
                         class="el-menu-vertical-demo"
                         :collapse="isCollapse"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b"
                         @open="handleOpen">
                    <el-submenu
                            v-for="item in menuList"
                            :index="item.name" :key="item.name">
                        <template slot="title" >
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <template v-if="item.children">
                            <el-menu-item
                                    :index="elem.name"
                                    v-for="elem in item.children"
                                    :key="elem.name">
                                {{elem.title}}
                            </el-menu-item>
                        </template>

                    </el-submenu>

                    <el-menu-item class="home-aside-bottom">
                        <i :class="['home-aside-el-icon-arrow', isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"
                           @click="isCollapse = !isCollapse"></i>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header>
                    <el-button type="danger" plain size="small">注销</el-button>
                </el-header>

                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                isCollapse: false,
                menuList: [
                    {
                        title: '系统管理',
                        name: 'system',
                        path: 'system',
                        children: [
                            {title: '系统管理员', name: 'admin', path: 'admin'},
                            {title: '权限管理', name: 'permission', path: 'permission'},
                            {title: '角色管理', name: 'role', path: 'role'}
                        ]
                    },
                    {
                        title: '日历管理',
                        name: 'daily',
                        path: 'daily'
                    },
                    {
                        title: '留言管理',
                        name: 'message',
                        path: 'message'
                    },
                    {
                        title: '音频管理',
                        name: 'music',
                        path: 'music'
                    },
                    {
                        title: '类型管理',
                        name: 'musicType',
                        path: 'musicType'
                    },
                    {
                        title: '微信登陆管理',
                        name: 'weChat',
                        path: 'weChat'
                    }
                ],
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created() {
            console.log(this.$http);
            console.log(process.env);
        }
    }
</script>

<style scoped lang='scss'>
    .home {
        .home-el-container {
            height: 100vh;
            border: 1px solid #eee;
            .el-aside {
                color: #333;
                transition:.3s width ease-in-out;
                .el-menu-vertical-demo:not(.el-menu--collapse) {
                    width: 200px;
                    height: 100%;
                }
                .el-menu--collapse {
                    width: 100px;
                    height: 100%;
                }
                .home-aside-bottom {
                    text-align: center;
                    .home-aside-el-icon-arrow {
                        color: white;
                        font-size: 30px;
                    }
                }
            }
            .el-header {
                background: linear-gradient(rgba(37, 66, 56, 0.08), rgba(247, 227, 196, 0.9));
                box-shadow: 0 0 10px 0 #898d89;
                color: #333;
                line-height: 60px;
                text-align: right;
                font-size: 12px;
            }
        }
    }
</style>