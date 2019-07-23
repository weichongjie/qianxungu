import Vue from 'vue'

Vue.mixin({
    methods: {
        messageBox(action, message) {
            return this.$confirm(`您确定要${message}吗？`, message, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                action().then(res=>{
                    if (res.success) {
                        this.$message({
                            type: 'success',
                            message: `${message}成功！`
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
        }
    }
});