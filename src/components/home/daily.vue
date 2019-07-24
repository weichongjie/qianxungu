<template>
  <div class="daily">
       <el-button type="primary" size="mini" @click="dialogVisible = true; gengxin=false">点击上传</el-button>

     <el-dialog title="上传图片" :visible.sync="dialogVisible" width="30%" 
    >

    <!-- 弹出点击上传的窗口 -->
     <el-form ref="form"  label-width="90px" :model="form"  >

                <div class="block" marginleft="20px">
                    <span class="demonstration"></span>
                    <el-date-picker
                    v-model="form.daily"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
                <br/>
                  <el-form-item label="图片描述" prop="roleDesc">
                    <el-input v-model="form.description" ></el-input>
                </el-form-item>

                  <el-form-item label="点赞数" prop= "permissions">
                    <el-input v-model="form.liked"></el-input>
                </el-form-item>
    </el-form>
        <el-button  type="primary" size="mini">确定</el-button>
          <el-button type="danger" size="mini">取消</el-button>

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

      <el-table-column prop="roleName" label="日期" width="150"></el-table-column>
      <el-table-column prop="roleDesc" label="图片" show-overflow-tooltip></el-table-column>
      <el-table-column prop="permissions" label="图片描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="permissions" label="点赞" show-overflow-tooltip></el-table-column>
      <!--操作列-->
      <el-table-column fixed="right" width="150">
        <!--自定义表头-->
        <template slot-scope="scope">
           <el-button  @click="like(scope.$index, scope.row) " type="primary" size="mini">赞</el-button>
        
       
        </template> 
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "daily",
  data() {
     return {
       tableData: ['1','2'],    //角色数据
       dialogVisible: false,  //控制新增、更新弹窗
       gengxin:true,      //判断是否更新点开弹窗
       form:{             
           daily:'',
           roleName:'',
           liked:'',  
           description:'', 
       },
       pickerOptions1: {//日期选择器
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },//以上日期快捷配置

    };

  },
  methods: {
    like(index, row){
      console.log(index,row)
    },
  }
};
</script>

<style scoped lang='scss'>
</style>