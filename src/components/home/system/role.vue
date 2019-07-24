<template>
    <div class="role">
        <el-button type="primary" size="mini" @click="dialogVisible = true; gengxin=false">新增角色</el-button>

        <el-dialog title="新增角色" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"
        >

            <!-- 新增或者更新角色时候弹出的修改信息窗口 -->
            <el-form ref="form" label-width="90px" :model="form">

                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="form.roleName"></el-input>
                </el-form-item>

                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="form.roleDesc"></el-input>
                </el-form-item>

                <el-form-item label="角色权限" prop="permissions">
                    <el-input v-model="form.permissions"></el-input>
                </el-form-item>
<<<<<<< HEAD
            </el-form>
            <el-button @click="newaddrole" type="primary" size="mini">确定</el-button>
            <el-button @click="handleClose" type="danger" size="mini">取消</el-button>

        </el-dialog>

        <el-table
                :data="tableData"
                height="600"
                stripe
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <!--多选框列-->
            <el-table-column type="selection" width="55" fixed></el-table-column>
            <!--内容列-->

            <el-table-column prop="roleName" label="角色名" width="150"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip></el-table-column>
            <el-table-column prop="permissions" label="角色权限" show-overflow-tooltip></el-table-column>
            <!--操作列-->
            <el-table-column fixed="right" width="150">
                <!--自定义表头-->
                <template slot="header" slot-scope="scope">操作</template>
                <template slot-scope="scope">
                    <el-button @click="updaterole(scope.$index, scope.row) " type="primary" size="mini">更新</el-button>
                    <el-button @click="deleterole(scope.$index, scope.row)" type="danger" size="mini">删除</el-button>


                </template>
            </el-table-column>
        </el-table>


    </div>
=======
    </el-form>
        <el-button @click="newaddrole" type="primary" size="mini">确定</el-button>
          <el-button @click="handleClose" type="danger" size="mini">取消</el-button>

    </el-dialog>
   
    <el-table
      :data="tableData"
      height="600"
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!--多选框列-->
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <!--内容列-->

      <el-table-column prop="roleName" label="角色名" width="150"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="permissions" label="角色权限" show-overflow-tooltip></el-table-column>
      <!--操作列-->
      <el-table-column fixed="right" width="150">
        <!--自定义表头-->
        <template slot="header" slot-scope="scope">操作</template>
        <template slot-scope="scope">
           <el-button  @click="updaterole(scope.$index, scope.row) " type="primary" size="mini">更新</el-button>
          <el-button @click="deleterole(scope.$index, scope.row)" type="danger" size="mini">删除</el-button>
       
        </template> 
      </el-table-column>
    </el-table>
     
      
  </div>
>>>>>>> dev
</template>

<script>
    export default {
        name: "role",
        data() {
            return {
                tableData: [],    //角色数据
                dialogVisible: false,  //控制新增、更新弹窗
                gengxin: true,      //判断是否更新点开弹窗
                form: {
                    roleName: '',
                    roleDesc: '',
                    permissions: '',
                },

            };
        },
        created() {
            this.getData();
        },

        methods: {
            //获取查询角色的数据
            async getData() {
                let res = await this.$http.get(this.$apis.findRoles);
                this.tableData = res.data;
            },
            //确定时候调用新增角色或者更新角色接口
            newaddrole() {
                if (this.gengxin) {  //更新角色
                    this.$http.post(this.$apis.updateRole, this.form).then(res => {
                        console.log(res);
                        this.$refs['form'].resetFields();
                        this.dialogVisible = false;
                        this.getData();
                    })
                } else {      //新增角色
                    this.$http.post(this.$apis.addNewRole, this.form).then(res => {
                        console.log(res);
                        this.$refs['form'].resetFields();
                        this.dialogVisible = false;
                        this.getData();
                    })
                }
            },


            //关闭新增角色窗口
            handleClose() {
                this.dialogVisible = false;
                this.$refs['form'].resetFields();
            },

            //更新角色
            updaterole(index, row) {
                console.log(index, row);
                this.form._id = row._id;
                this.dialogVisible = true;
                this.gengxin = true;

            },
            //删除角色+弹窗
            deleterole(index, row) {
                console.log(index, row);
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        var _id = row._id;
                        console.log(_id);
                        //调用删除角色接口
                        this.$http.post(this.$apis.deleteRole, {_id});
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        }
    };
</script>

<style scoped lang='scss'>
    .role {
        overflow-y: hidden;

    }
</style>