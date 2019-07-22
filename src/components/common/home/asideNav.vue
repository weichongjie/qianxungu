<template>
    <div class="asideNav">
        <el-menu class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 @open="handleOpen"
                 @close="handleOpen">
<!--            主菜单-->
            <el-submenu
                    v-for="item in menuList"
                    :index="item.path">
                <template slot="title" >
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
<!--                子菜单-->
                <template v-if="item.children">
                    <el-menu-item
                            :index="elem.path"
                            v-for="elem in item.children"
                            @click="changeNav(elem)">
                        {{elem.title}}
                    </el-menu-item>
                </template>
            </el-submenu>

            <el-menu-item class="home-aside-bottom">
                <i :class="['home-aside-el-icon-arrow', isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"
                   @click="handleCollapse"></i>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "asideNav",
        data() {
            return {
                isCollapse: false,
                menuList: [
                    {
                        title: '系统管理',
                        name: 'system',
                        path: '/home/system',
                        children: [
                            {title: '系统管理员', name: 'admin', path: '/home/system/admin'},
                            {title: '权限管理', name: 'permission', path: '/home/system/permission'},
                            {title: '角色管理', name: 'role', path: '/home/system/role'}
                        ]
                    },
                    {
                        title: '日历管理',
                        name: 'daily',
                        path: '/home/daily'
                    },
                    {
                        title: '留言管理',
                        name: 'message',
                        path: '/home/message'
                    },
                    {
                        title: '音频管理',
                        name: 'music',
                        path: '/home/music'
                    },
                    {
                        title: '类型管理',
                        name: 'musicType',
                        path: '/home/musicType'
                    },
                    {
                        title: '微信登陆管理',
                        name: 'weChat',
                        path: '/home/weChat'
                    }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
                this.$router.push({path: key});
            },
            changeNav(item) {
                console.log(item);
                this.$router.push({path: item.path});
                this.$store.commit('changeTitle', item.title);
                this.$store.commit('changePath', item.path);
            },
            handleCollapse() {
                this.isCollapse = !this.isCollapse;
                this.$store.commit('changeIsCollapse', this.isCollapse);
            }
        }
    }
</script>

<style scoped lang='scss'>
    .asideNav {
        width: 100%;
        height: 100%;
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
</style>