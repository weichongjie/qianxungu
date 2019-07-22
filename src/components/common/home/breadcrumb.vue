<template>
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--            对象形式-->
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
<!--            字符串形式-->
            <el-breadcrumb-item :to="path" v-for="(item, index) in title" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "breadcrumb",
        computed: {
            title() {
                let obj = JSON.parse(this.$store.state.title);
                let title = obj['title'];
                return title;
            },
            path() {
                console.log(this.$store.state.path);
                return this.$store.state.path;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .breadcrumb {
        margin: 10px 0 10px 10px;
        color: #bbff93;
    }
</style>