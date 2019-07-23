<template>
    <div class="addForm">
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleCancel">
            <el-form ref="permissionForm" :model="form" label-width="100px">

                <el-form-item label="权限名称" required prop="permissionName">
                    <el-input v-model="form.permissionName"></el-input>
                </el-form-item>

                <el-form-item label="权限描述" required prop="permissionDesc">
                    <el-input v-model="form.permissionDesc"></el-input>
                </el-form-item>

                <el-form-item label="权限等级" required prop="permissionLeve">
                    <el-select
                            v-model="form.permissionLeve"
                            @change="changePermissionLevel"
                            :disabled="permissionLeveDisabled"
                            placeholder="请选择权限等级">
                        <el-option
                                :label="item"
                                :value="item"
                                v-for="item in permissionLeve"
                                :key="item">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="父级权限ID" required prop="parentid">
                    <el-select
                            v-model="form.parentid"
                            @change="changeParentId"
                            :disabled="parentIdDisabled"
                            placeholder="请选择父级权限ID">
                        <el-option label="无父级" value="0"></el-option>
                        <el-option
                                :label="item.permissionDesc"
                                :value="item._id"
                                v-for="item in allPermissions"
                                :key="item._id">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="权限序号" prop="sortNum">
                    <el-input v-model="form.sortNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel" size="small">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "addForm",
        props: {
            title: String,
            allPermissions: Array,
            getData: Function
        },
        data() {
            return {
                form: {
                    permissionName: '',
                    permissionLeve: '',
                    parentid: '',
                    permissionDesc: '',
                    sortNum: 0
                },
                permissionLeve: ['1', '2', '3'],
                parentIdDisabled: false,
                permissionLeveDisabled: false

            }
        },
        computed: {
            dialogVisible() {
                return this.$store.state.dialogVisible;
            }
        },
        methods: {
            changePermissionLevel (value) {
                if (value === '1') {
                    this.parentIdDisabled = true;
                    this.form.parentid = '0';
                } else {
                    this.parentIdDisabled = false;
                }
            },
            changeParentId (value) {
                if (value === '0') {
                    this.permissionLeveDisabled = true;
                    this.form.permissionLeve = '1';
                } else {
                    this.permissionLeveDisabled = false;
                }
            },
            handleSubmit() {
                this.$refs['permissionForm'].validate(valid => {
                    if (valid) {
                        this.$http.post(this.$apis.addNewPermission, this.form).then(res => {
                            if (res.success) {
                                this.handleCancel();
                                this.getData();
                            }
                        });
                        // let action = () => this.$http.post(this.$apis.addNewPermission, this.form);
                        // this.messageBox(action, '新增权限').then(() => {
                        //     this.handleCancel();
                        //     this.getData();
                        // });
                    }
                });
            },
            handleCancel () {
                this.$refs['permissionForm'].resetFields();
                this.$store.commit('changeDialogVisible', false);
            }
        }
    }
</script>

<style scoped lang='scss'>

</style>