<template>
    <div class="home">
<!--        容器布局-->
        <el-container class="home-el-container">
<!--            侧边导航-->
            <el-aside :width="isCollapse ? '101px' : '201px'">
                <aside-nav></aside-nav>
            </el-aside>

<!--            右边内容-->
            <el-container>
<!--                内容头部-->
                <el-header>
                    <el-button type="danger" plain size="small" @click="logout">注销</el-button>
                </el-header>

<!--                面包屑-->
<!--                <breadcrumb></breadcrumb>-->

<!--                内容主体-->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import asideNav from  '@/components/common/home/asideNav'
    import breadcrumb from '@/components/common/home/breadcrumb'

    export default {
        name: "Home",
        components: {asideNav, breadcrumb},
        data() {
            return {

            }
        },
        methods: {
            logout() {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                this.$router.push({path: '/login'});
            }
        },
        computed: {
            isCollapse() {
                return this.$store.state.isCollapse;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .home {
        overflow-y: hidden;
        .home-el-container {
            height: 100vh;
            border: 1px solid #eee;
            .el-aside {
                color: #333;
                transition:.3s width ease-in-out;
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