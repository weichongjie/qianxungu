<template>
    <div class="musicType">
        <el-button type="primary" size="small" @click="handleAdd">新增音乐类型</el-button>
        <!--        新增-->
        <el-dialog
                title="新增音乐类型"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleCancel">
            <el-form ref="musicTypeForm" :model="form" label-width="100px">

                <el-form-item label="音乐类型" required prop="type">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>

                <el-form-item label="类型图标" required prop="icon">
                    <el-input v-model="form.icon"></el-input>
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
                    prop="type"
                    label="音乐类型"
                    width="150"
                    show-overflow-tooltip>

            </el-table-column>
            <el-table-column
                    prop="icon"
                    label="类型图标"
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
                            @click="deleteAdmin(scope.$index, scope.row)"
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
        name: "musicType",
        data() {
            return {
                dialogVisible: false,
                tableData: [],
                form: {
                    type: '',
                    icon: '',
                }
            }
        },
        methods: {
            handleAdd() {
                this.dialogVisible = true;
                this.$store.commit('changeDialogVisible', this.dialogVisible);
            },
            handleSubmit() {
                this.$refs['musicTypeForm'].validate(valid => {
                    if (valid) {
                        this.$http.post(this.$apis.addNewMusicType, this.form).then(res => {
                            if (res.success) {
                                this.handleCancel();
                                this.getData();
                            }
                        })
                        // let action = () => this.$http.post(this.$apis.addNewMusicType, this.form);
                        // this.messageBox(action, '添加音乐类型').then(() => {
                        //     this.handleCancel();
                        //     this.getData();
                        // });
                    }
                });
            },
            handleCancel () {
                this.dialogVisible = false;
                this.$refs['musicTypeForm'].resetFields();
                this.$store.commit('changeDialogVisible', this.dialogVisible);
            },
            deleteAdmin(index, item) {
                console.log(item);
                let action = () => this.$http.post(this.$apis.deleteMusicType, {_id: item._id});
                this.messageBox(action, '删除音乐类型').then(() => {
                    this.getData();
                })
            },
            getData() {
                this.$http.get(this.$apis.findMusicTypes).then(res => {
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