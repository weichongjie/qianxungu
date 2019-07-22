<template>
  <div class="role">
    <el-button type="primary" size="mini" @click="dialogVisible = true">新增角色</el-button>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-button type="primary" size="mini">查询角色</el-button>

    <el-table
      :data="tableData"
      height="600"
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!--                        多选框列-->
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <!--                        内容列-->

      <el-table-column prop="roleName" label="角色名" width="150"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip></el-table-column>
      <!--                        操作列-->
      <el-table-column fixed="right" width="150">
        <!--                            自定义表头-->
        <template slot="header" slot-scope="scope">操作</template>

        <template slot-scope="scope">
          <el-button @click="updaterole(scope.$index, scope.row)" type="primary" size="mini">更新</el-button>
          <el-button @click="deleterole(scope.$index, scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "role",
  data() {
    return {
      tableData: [],
       dialogVisible: false
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
    //新增角色
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

    //更新角色
    updaterole(index, row) {
      console.log(index, row);
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
          this.$http.post(this.$apis.deleteRole, { _id });
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
</style>