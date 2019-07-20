<template>
    <div class="permission">
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
    </div>
</template>

<script>
    export default {
        name: "permission",
        data() {
            return {
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
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style scoped lang='scss'>

</style>