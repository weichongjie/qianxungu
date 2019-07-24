<template>
    <div class="admin">
        <el-button type="primary" size="small" @click="handleAdd">新增管理员</el-button>
<!--        新增-->
        <el-dialog
                title="新增管理员"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleCancel">
            <el-form ref="adminForm" :model="form" label-width="100px">

                <el-form-item label="管理员名称" required prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item label="管理员密码" required prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>

                <el-form-item label="管理员昵称" required prop="nickname">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>

                <el-form-item label="管理员角色" required prop="roles">
                    <el-input v-model="form.roles"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel" size="small">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" size="small">确 定</el-button>
            </span>
        </el-dialog>

<!--        显示-->
        <el-table
                :data="tableData"
                height="600"
                stripe
                row-key="_id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <!--                        多选框列-->
            <el-table-column
                    type="selection"
                    width="55" fixed>

            </el-table-column>
            <!--                        内容列-->
            <el-table-column
                    prop="username"
                    label="管理员名称"
                    width="150"
                    show-overflow-tooltip>

            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="管理员昵称"
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
    export default {
        name: "admin",
        data() {
            return {
                dialogVisible: false,
                tableData: [],
                form: {
                    username: '',
                    password: '',
                    roles: '',
                    nickname: ''
                }
            }
        },
        methods: {
            handleAdd() {
                this.dialogVisible = true;
                this.$store.commit('changeDialogVisible', this.dialogVisible);
            },
            handleSubmit() {
                this.$refs['adminForm'].validate(valid => {
                    if (valid) {
                        this.$http.post(this.$apis.addNewAdmin, this.form).then(res => {
                            if (res.success) {
                                this.handleCancel();
                                this.getData();
                            }
                        });
                        // let action = () => this.$http.post(this.$apis.addNewAdmin, this.form);
                        // this.messageBox(action, '添加用户').then(() => {
                        //     this.handleCancel();
                        //     this.getData();
                        // });
                    }
                });
            },
            handleCancel () {
                this.dialogVisible = false;
                this.$refs['adminForm'].resetFields();
                this.$store.commit('changeDialogVisible', this.dialogVisible);
            },
            handleDelete(index, item) {
                console.log(item);
                let action = () => this.$http.post(this.$apis.deleteAdmin, {_id: item._id});
                this.messageBox(action, '删除用户').then(() => {
                    this.getData();
                })
            },
            getData() {
                this.$http.get(this.$apis.findAdmins).then(res => {
                    console.log(res);
                    this.tableData = res.data;
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