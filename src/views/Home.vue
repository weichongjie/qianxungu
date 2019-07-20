<template>
    <div class="home">
        <el-container class="home-el-container">
            <el-aside :width="isCollapse ? '101px' : '201px'">
                <el-menu default-active="1-1"
                         class="el-menu-vertical-demo"
                         :collapse="isCollapse"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b"
                         @open="handleOpen">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
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
                    <el-table
                            :data="tableData"
                            height="600"
                            stripe
                            row-key="id"
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
<!--                        多选框列-->
                        <el-table-column type="selection" width="55" fixed>
                        </el-table-column>
<!--                        内容列-->
                        <el-table-column prop="date" label="日期" width="150">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="150">
                        </el-table-column>
                        <el-table-column prop="address" label="地址"  show-overflow-tooltip>
                        </el-table-column>
<!--                        操作列-->
                        <el-table-column
                                fixed="right"

                                width="150">
<!--                            自定义表头-->
                            <template slot="header" slot-scope="scope">
                                操作
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        @click="handleEdit(scope.$index, scope.row)"
                                        type="primary"
                                        size="mini">
                                    编辑
                                </el-button>
                                <el-button
                                        @click="handleDelete(scope.$index, scope.row)"
                                        type="danger"
                                        size="mini">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
                tableData: [
                    {
                        id: 1,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        children: [{
                            id: 31,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: 32,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }]
                    }, {
                        id: 2,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        children: [{
                            id: 34,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }]
                    }, {
                        id: 3,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        id: 4,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        id: 5,
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        id: 6,
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        id: 7,
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
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