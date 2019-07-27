<template>
  <div class="daily">
       <el-button type="primary" size="mini" @click="dialogVisible = true">点击上传</el-button>

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
                    :picker-options="pickerOptions1"
                    prop="daily">
                    </el-date-picker>
                </div>
              <!-- 点击上传模块 -->
              <el-form-item label="日历背景图片" required>
                    <el-upload
                            
                            class="upload-demo"
                            action="http://localhost:3000"
                            ref="imgUpload"
                            :auto-upload="false"    
                            :http-request="upload"
                            :on-change="imgChange"
                            :before-remove="beforeRemove"
                            :on-success="filesuccess"
                            :on-preview="filepreview"
                            :on-progress="fileprogress"
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF">
                        <el-button slot="trigger" size="small" type="primary">选取图片文件</el-button>
                        <div slot="tip" class="el-upload-tip">只能选取1个图片文件</div>
                    </el-upload>
                </el-form-item>

              

                <br/>
                  <el-form-item label="图作者" prop="author">
                    <el-input v-model="form.description.author" ></el-input>
                </el-form-item>
                <el-form-item label="图开头" prop="title">
                    <el-input v-model="form.description.title" ></el-input>
                </el-form-item>
                <el-form-item label="图内容" prop="content">
                    <el-input v-model="form.description.content" ></el-input>
                </el-form-item>

                  <el-form-item label="点赞数" prop= "liked">
                    <el-input v-model="form.liked"></el-input>
                </el-form-item>
    </el-form>
        <el-button  type="primary" size="mini" @click="upload">确定</el-button>
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
       dialogVisible: false,  //控制上传弹窗
       form:{             
           daily:'',        //日期
           dailyIMG:{},     //图片文件
           liked:'',          //点赞数
           description:{//日历图片描述
            author:'',
            title:'',
            content:''},  
       },
        

        imgFile:{}, //存放图片文件属性
        audioFile:{},//存放音频文件属性，本组件用不上

       //日期选择器
       pickerOptions1: {
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
    //点赞按钮
    like(index, row){
      console.log(index,row)
    },
  //获取上传的文件状态
  imgChange(file){
     console.log(file)
   this.form.dailyIMG = file.raw;
   console.log('imgchange里面的file',this.form.dailyIMG) 

   },
   //文件上传成功时的钩子  function(response, file, fileList)
   filesuccess(response, file, fileList){
      console.log('文件上传成功时的钩子',response, file, fileList)
   },
   ////点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据function(file)
  filepreview(file){
console.log('点击已上传的文件', file)
  },
  //文件上传时的钩子
  fileprogress(event,file,fileList){
    console.log('文件上传时的钩子',event,file,fileList)
  },

  //分块上传
  upload(){
   
    //文件是否添加
    // if(!this.imgFile.name){
    //   this.$message({type:'error',$message:'当前没有选择图片,请选择图片文件'});
    //   return false;
    // }
    // //分块大小
    // let chunkSize = 1 * 1024 * 1024;
    // //文件大小
    // let fileSize = this.audioFile.size;
    // //分块数量 
    // let chunks = Math.ceil(fileSize / chunkSize );
    // //音乐类型
    // let musicType = this.audioFile.type;
    //开始上传
      //日期时间处理
      let year = this.form.daily.getUTCFullYear();
      let month = addZero(this.form.daily.getMonth() + 1);
      let day = addZero(this.form.daily.getDate());
      
      function addZero(num) {
          if (num < 10) {
              return '0' + num;
          } else {
              return num;
          }
      }
      this.form.daily = `${year}-${month}-${day}`;
      console.log('日期',this.form.daily);

    
     console.log('描述',this.form.description)
      console.log('图片',this.form.dailyIMG)
      //描述对象转成字符串
    // var description = JSON.stringify(this.form.description)
    // this.form.description = description;
    
    console.log(this.form.description)
    console.log(this.form)
    this.$http.post(this.$apis.setDailyBackground, this.form).then(res => {
                    console.log('获取到的数据结果', res);
                    resolve(res);
                })
  },
  //移除上传图片提醒
  beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
  },


  }
};
</script>

<style scoped lang='scss'>
</style>