<template>
    <div class="permission">
        <el-button type="primary" size="small" @click="addPermission">新增权限</el-button>
        <add-form title="新增权限" :allPermissions="tableData"></add-form>
        <el-table
                :data="tableData"
                height="600"
                stripe
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <!--                        多选框列-->
            <el-table-column
                    type="selection"
                    width="55" fixed>

            </el-table-column>
            <!--                        内容列-->
            <el-table-column
                    prop="permissionName"
                    label="权限名称"
                    width="150"
                    show-overflow-tooltip>

            </el-table-column>
            <el-table-column
                    prop="permissionDesc"
                    label="权限描述"
                    show-overflow-tooltip>

            </el-table-column>
            <!--                        操作列-->
            <el-table-column
                    fixed="right"
                    width="80">
                <!--                            自定义表头-->
                <template slot="header" slot-scope="scope">操作</template>
                <template slot-scope="scope">
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
    import addForm from "@/components/common/addForm"

    export default {
        name: "permission",
        components: {addForm},
        data() {
            return {
                dialogVisible: false,
                tableData: []
            }
        },
        methods: {
            addPermission() {
                this.dialogVisible = true;
                this.$store.commit('changeDialogVisible', this.dialogVisible);
            },
            handleDelete(index, item) {
                console.log(index, item);
                let action = this.$http.post(this.$apis.deletePermission, {_id: item._id});
                this.messageBox(action, '删除权限').then(res => {
                    console.log(res);
                })
            },
            getData() {
                this.$http.post(this.$apis.findPermission).then(res => {
                    console.log(res);
                    this.tableData = this.handlePermissions(res.data);
                    console.log(this.tableData);
                })
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped lang='scss'>

</style>