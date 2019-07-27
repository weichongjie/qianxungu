import Vue from 'vue'
import SparkMD5 from 'spark-md5'

Vue.mixin({
    methods: {
        // 消息弹框
        messageBox(action, message) {
            return this.$confirm(`您确定要${message}吗？`, message, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                action().then(res => {
                    console.log(res);
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: `${message}成功！`
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: `${message}失败`
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${message}`
                });
            });
        },
        // 处理权限
        handlePermissions(permissions) {
            if (!(permissions instanceof Array)) {
                return;
            }
            // 处理后的结果
            let handledPermissions = [];
            let permissionsLength = permissions.length - 1;
            for (let i = 0; i <= permissionsLength; i++) {
                let permission = permissions[i];
                if (permission) {
                    if (permission.parentid === '0') {
                        permission.children = [];
                        handledPermissions.push(permission);
                    } else {
                        let handledPermissionsLength = handledPermissions.length - 1;
                        for (let j = 0; j <= handledPermissionsLength; j++) {
                            let parent = handledPermissions[j];
                            if (parent._id === permission.parentid) {
                                parent.children.push(permission);
                            }
                        }
                    }
                }
            }
            return handledPermissions;
        },
        // MD5加密
        sparkMd5File(file) {
            return new Promise((resolve, reject) => {
                let blobSlice = File.prototype.slice || File.prototype.webkitSlice || File.prototype.mozSlice;
                // let chunkSize = 1024 * 1024 * 1;
                let chunks = 100;
                let chunkSize = file.size / 100;
                // let chunks = Math.ceil(file.size / chunkSize);
                let currentChunk = 0;
                let spark = new SparkMD5.ArrayBuffer();
                let fileReader = new FileReader();
                fileReader.onload = function (e) {
                    // spark.append(e.target.result);
                    spark.append(this.result);
                    currentChunk++;
                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        resolve(spark.end());
                    }
                };
                
                // 加载下一块
                function loadNext() {
                    let start = currentChunk * chunkSize;
                    let end = ((start + chunkSize) >= file.size) ? file.size : (start + chunkSize);
                    fileReader.readAsArrayBuffer(blobSlice.apply(file,[start, end]));
                    let checkPercentage = currentChunk + 1;
                }
                loadNext();
            })
        },
        // 检查文件是否存在
        checkFileExist(fileName, fileMd5Value, musicType) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_BASE_URL}/music/checkFile?fileName=${fileName}&fileMd5Value=${fileMd5Value}&musicType=${musicType}`;
                this.$http.get(url).then(res => {
                    resolve(res);
                })
            })
        },
        // 上传分块
        uploadChunk(index, fileMd5Value, chunkSize, chunks, audioFile, imgFile, fileName, musicType, description) {
            return new Promise((resolve, reject) => {
                let end = (index + 1) * chunkSize >= audioFile.size ? audioFile.size : (index + 1) * chunkSize;
                // 构建一个表单
                let form = new FormData();
                form.append('vedio', audioFile.slice(index * chunkSize, end));
                form.append('totalChunks', chunks);
                form.append('currChunk', index);
                form.append('fileMd5Value', fileMd5Value);
                form.append('filename', fileName);
                form.append('musicType', musicType);
                form.append('description', description);
                // 添加音频背景图
                if ((index + 1) === chunks) {
                    let iconInput = imgFile;
                    form.append('iconInput', iconInput);
                }
                this.$http.post(this.$apis.uploadMusic, form).then(res => {
                    if (res.success) {
                        resolve(res);
                    }
                })
            })
        },
        // 检查已上传分块，上传未上传的分块
        checkAndUploadChunk(imgFile, audioFile, chunkSize, chunks, fileMd5Value, chunkList, fileName, musicType, description) {
            return new Promise((resolve, reject) => {
                let length = chunkList.length;
                for (let i = 0; i < chunks; i++) {
                    // 不存在返回-1即false，存在返回索引即true
                    let existChunk = chunkList.indexOf(i + '') > -1;
                    // 不存在就上传
                    if (!existChunk) {
                        this.uploadChunk(i, fileMd5Value, chunkSize, chunks, audioFile, imgFile, fileName, musicType, description).then(res => {
                            length++;
                            // 上传进度
                            let uploadPercentage = Math.floor((length / chunks) * 100);
                            resolve(res);
                        })
                    }
                }
            })
        },
        // 开始上传
        startUpload(audioFile, imgFile, chunkSize, chunks, musicType, description) {
            return new Promise((resolve, reject) => {
                // 文件使用md5加密
                this.sparkMd5File(audioFile).then(res => {
                    // console.log('fileMd5Value',res);
                    let fileMd5Value = res;
                    // 检验文件是否存在
                    this.checkFileExist(audioFile.name, fileMd5Value, musicType).then(res => {
                        console.log('检验文件是否存在返回数据', res);
                        // 服务器该文件已经存在
                        if (res.chunkList.length) {
                            // console.log('文件存在', res.file);
                            this.$message({type: 'success', message: '文件已秒传成功'});
                            return false;
                        } else {
                            // 服务器该文件不存在
                            this.checkAndUploadChunk(imgFile, audioFile, chunkSize, chunks, fileMd5Value, res.chunkList, audioFile.name, musicType, description).then(res => {
                                resolve(res);
                            });
                        }
                    })
                });
            });
        },
        // 合并分块
        // mergeChunk(fileMd5Value, fileName, file, musicType) {
        //     let url = `${process.env.VUE_APP_BASE_URL}/music/mergeChunk?md5=${fileMd5Value}&fileName=${fileName}&size=${file.size}&musicType=${musicType}`;
        //     this.$http.get(url).then(res => {
        //         console.log('合并分块返回数据', res);
        //         this.$message({type: 'success', message: '上传成功'});
        //     })
        // },
    },
    filters: {
        transTime(val) {
            let newVal = parseInt(val);
            let now = new Date(newVal);
            let year = now.getUTCFullYear();
            let month = addZero(now.getMonth() + 1);
            let day = addZero(now.getDate());
            let hour = addZero(now.getHours());
            let minute = addZero(now.getMinutes());
            let second = addZero(now.getSeconds());
    
            function addZero(num) {
                if (num < 10) {
                    return '0' + num;
                } else {
                    return num;
                }
            }
        
            return `${year}年${month}月${day}日${hour}时${minute}分${second}秒`;
        }
    }
});