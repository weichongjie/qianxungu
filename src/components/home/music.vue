<template>
    <div class="music">
        <el-button type="primary" size="small" @click="handleAdd">新增音频</el-button>
        <!--        新增-->
        <el-dialog
                title="新增音频"
                :visible.sync="isUpload"
                width="50%"
                :before-close="cancelAdd">
            <el-form ref="musicUploadForm" :model="uploadForm" label-width="100px">

                <el-form-item label="音乐文件" required>
                <!--action	必选参数，上传的地址-->
                <!--multiple	是否支持多选文件-->
                <!--show-file-list	是否显示已上传文件列表-->
                <!--on-remove	文件列表移除文件时的钩子-->
                <!--auto-upload	是否在选取文件后立即进行上传-->
                    <el-upload
                            class="upload-demo"
                            action="http://localhost:3000"
                            ref="musicUpload"
                            :auto-upload="false"
                            :http-request="upload"
                            :on-change="musicChange"
                            :before-remove="beforeRemove"
                            accept=".cd,.mp3,.wma,.flac,.aac,.mmf,.amr,.m4a,.m4r,.ogg,.mp2,.wav,.wv,.CD,.MP3,.WMA,.FLAC,.AAC,.MMF,.AMR,.M4A,.M4R,.OGG,.MP2,.WAV,.WV">
                        <el-button slot="trigger" size="small" type="primary">选取音频文件</el-button>
                        <div slot="tip" class="el-upload-tip">只能选取1个音频文件</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="音乐背景" required>
                    <el-upload
                            class="upload-demo"
                            action="http://localhost:3000"
                            ref="imgUpload"
                            :auto-upload="false"
                            :http-request="upload"
                            :on-change="imgChange"
                            :before-remove="beforeRemove"
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF">
                        <el-button slot="trigger" size="small" type="primary">选取图片文件</el-button>
                        <div slot="tip" class="el-upload-tip">只能选取1个图片文件</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="音乐描述" required prop="description">
                    <el-input v-model="uploadForm.description"></el-input>
                </el-form-item>

                <el-form-item label="校验文件进度">
                    <el-progress
                            :text-inside="true"
                            :stroke-width="20"
                            :percentage="checkPercentage"
                            :color="customColors">

                    </el-progress>
                </el-form-item>
                <el-form-item label="上传文件进度">
                    <el-progress
                            :text-inside="true"
                            :stroke-width="20"
                            :percentage="uploadPercentage"
                            :color="customColors">

                    </el-progress>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd" size="small">取消新增</el-button>
                <el-button @click="CancelUpload" size="small">取消上传</el-button>
                <el-button type="success" @click="submitUpload" size="small">上传到服务器</el-button>
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
<!--            展开内容-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="音频 ID">
                            <span>{{ props.row._id }}</span>
                        </el-form-item>
                        <el-form-item label="音频名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="音频类型">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="音频地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="音频源文件">
                            <span>{{ props.row.xm4aPath }}</span>
                        </el-form-item>
                        <el-form-item label="音频背景">
                            <span>{{ props.row.icon }}</span>
                        </el-form-item>
                        <el-form-item label="喜爱人数">
                            <span>{{ props.row.liked }}</span>
                        </el-form-item>
                        <el-form-item label="音频发布日期">
                            <span>{{ props.row.pubDate }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <!--                        内容列-->
            <el-table-column
                    prop="name"
                    label="音频名称"
                    width="150"
                    show-overflow-tooltip>

            </el-table-column>
            <el-table-column
                    prop="type"
                    label="音频类型"
                    width="150"
                    show-overflow-tooltip>

            </el-table-column>
            <el-table-column
                    prop="pubDate"
                    label="音频发布日期"
                    width="150"
                    show-overflow-tooltip>

            </el-table-column>
            <el-table-column
                    prop="description"
                    label="音频描述"
                    show-overflow-tooltip>

            </el-table-column>
            <!--                        操作列-->
            <el-table-column
                    fixed="right"
                    width="150">
                <!--                            自定义表头-->
                <template slot="header" slot-scope="scope">操作</template>
                <template slot-scope="scope">
<!--                    更新-->
                    <el-button
                            @click="handleUpdate(scope.$index, scope.row)"
                            type="primary"
                            size="mini">
                        更新
                    </el-button>
<!--                    删除-->
                    <el-button
                            @click="handleDelete(scope.$index, scope.row)"
                            type="danger"
                            size="mini">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

<!--        更新-->
        <el-dialog
                title="更新音频信息"
                :visible.sync="isUpdate"
                width="30%"
                :before-close="cancelUpdate">
            <el-form ref="musicUpdateForm" :model="updateForm" label-width="100px">

                <el-form-item label="音乐名称" required prop="name">
                    <el-input v-model="updateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="音乐描述" required prop="description">
                    <el-input v-model="updateForm.description"></el-input>
                </el-form-item>
                <el-form-item label="音乐类型" required prop="type">
                    <el-input v-model="updateForm.type"></el-input>
                </el-form-item>
                <el-form-item label="音乐背景" required prop="icon">
                    <el-input v-model="updateForm.icon"></el-input>
                </el-form-item>
                <el-form-item label="音乐 ID" required prop="_id">
                    <el-input v-model="updateForm._id" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelUpdate" size="small">取 消</el-button>
                <el-button type="primary" @click="submitUpdate" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "music",
        data() {
            return {
                isUpload: false,
                isUpdate: false,
                tableData: [],
                uploadForm: {
                    description: ''
                },
                updateForm: {
                    name: '',
                    description: '',
                    _id: '',
                    type: '',
                    icon: ''
                },
                checkPercentage: 0,
                uploadPercentage: 0,
                customColors: [
                    {color: '#f56c6c', percentage: 20},
                    {color: '#e6a23c', percentage: 40},
                    {color: '#5cb87a', percentage: 60},
                    {color: '#1989fa', percentage: 80},
                    {color: '#6f7ad3', percentage: 100}
                ],
                audioFile: {},
                imgFile: {},
                musicList: []
            }
        },
        methods: {
            // 点击新增
            handleAdd() {
                this.isUpload = true;
            },
            // 移除文件之前
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 获取音频文件
            musicChange(file) {
                 console.log(file);
                this.audioFile = file.raw;
                 console.log(this.audioFile);
            },
            // 获取图片文件
            imgChange(file) {
                this.imgFile = file.raw;
                // console.log(this.imgFile);
            },
            // 分块上传
            upload() {
                // 文件是否添加
                if (!this.audioFile.name) {
                    this.$message({type: 'error', message: '当前没有选择音频文件，请选择音频文件'});
                    return false;
                }
                if (!this.imgFile.name) {
                    this.$message({type: 'error', message: '当前没有选择图片文件，请选择图片文件'});
                    return false;
                }
                // 分块大小
                let chunkSize = 1 * 1024 * 1024;
                // 文件大小
                let fileSize = this.audioFile.size;
                // 分块数量
                let chunks = Math.ceil(fileSize / chunkSize);
                // 音乐类型
                let musicType = this.audioFile.type;
                // 开始上传
                this.startUpload(this.audioFile, this.imgFile, chunkSize, chunks, musicType, this.description);
            },
            // 点击上传
            submitUpload() {
                this.$refs['musicUploadForm'].validate(valid => {
                    if (valid) {
                        this.$refs.musicUpload.submit();
                        this.$refs.imgUpload.submit();
                        console.log(this.$refs.imgUpload);
                        console.log(this.uploadPercentage);
                        this.cancelAdd();
                        this.getData();
                    }
                })
                // if (this.uploadPercentage >= 100) {
                //     this.cancelAdd();
                //     this.getData();
                // }
                
            },
            // 取消上传
            CancelUpload() {
                this.$refs.musicUpload.abort();
                this.$refs.imgUpload.abort();
                this.uploadPercentage = 0;
                this.checkPercentage = 0;
            },
            // 取消新增
            cancelAdd () {
                this.isUpload = false;
                this.$refs.musicUploadForm.resetFields();
                this.$refs.musicUpload.clearFiles();
                this.$refs.imgUpload.clearFiles();
            },
            // 点击更新
            handleUpdate(index, item) {
                console.log(item);
                this.form.name = item.name;
                this.form._id = item._id;
                this.form.description = item.description;
                this.form.type = item.type;
                this.form.icon = item.icon;
                this.isUpdate = true;
            },
            // 提交更新
            submitUpdate() {
                this.$refs['musicUpdateForm'].validate(valid => {
                    if (valid) {
                        this.$http.post(this.$apis.updateMusicInfo, this.updateForm).then(res => {
                            if (res.success) {
                                this.cancelUpdate();
                                this.getData();
                            }
                        });
                    }
                })
            },
            // 取消更新
            cancelUpdate () {
                this.isUpdate = false;
                this.$refs.musicUpdateForm.resetFields();
            },
            // 点击删除
            handleDelete(index, item) {
                console.log(item);
                let obj = {_id: item._id};
                this.musicList.push(obj);
                let action = () => this.$http.post(this.$apis.deleteMusic, {musicList: this.musicList});
                this.messageBox(action, '删除音频').then(res => {
                    console.log(res);
                    this.musicList = [];
                    this.getData();
                })
            },
            // 获取数据
            getData() {
                this.$http.get(this.$apis.findMusic).then(res => {
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
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
    }
    .el-progress {
        margin-top: 10px;
    }
</style>