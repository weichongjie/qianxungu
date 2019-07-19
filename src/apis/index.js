import Vue from 'vue'

let apis = {
    // 系统管理接口
    // 登陆接口
    signIn: '/signin',
    // 动态验证：get
    checkDynamicCode: '/checkDynamicCode',
    
    // 权限接口
    // 获取权限：post
    findPermission: '/system/permission/findPermission',
    // 新增权限：post
    addNewPermission: '/system/permission/addNewPermission',
    // 删除权限：post
    deletePermission: '/system/permission/deletePermission',
    
    // 角色接口
    // 获取角色：get
    findRoles: '/system/role/findRoles',
    // 更新角色：post
    updateRole: '/system/role/updateRole',
    // 删除角色：post
    deleteRole: '/system/role/deleteRole',
    // 添加角色：post
    addNewRole: '/system/role/addNewRole',
    
    // 管理员接口
    // 获取管理员：get
    findAdmins: '/system/admin/findAdmins',
    // 新增管理员：post
    addNewAdmin: '/system/admin/addNewAdmin',
    // 删除管理员：post
    deleteAdmin: '/system/admin/deleteAdmin',
    
    // 日历管理接口
    // 查询背景图：get
    // 例：/webapp/findDailyBackground?from=2019-06-12&to=2019-06-15
    findDailyBackground: '/webapp/findDailyBackground',
    // 点赞：post
    setDailyBackgroundLike: '/daily/setDailyBackgroundLike',
    // 设置日历：post
    setDailyBackground: '/daily/setDailyBackground',
    
    // 留言管理接口
    // 新增留言：post
    addNewMessage: '/message/addNewMessage',
    
    //---类型管理
    //删除音乐类型：POST
    deleteMusicType:'/music/deleteMusicType',
    //查询音乐类型：GET
    findMusicTypes:'/music/findMusicTypes',
    //新增类型：POST
    addNewMusicType:'/music/addNewMusicType',
    
    //---微信端接口
    //登录接口：POST
    WeChatSignIn:'/user/signin',
    
    //---音频管理
    //更新音频信息：POST
    updateMusicInfo:'/music/updateMusicInfo',
    //删除音频：POST
    deleteMusic:'/music/deleteMusic',
    //查询音频列表:GET
    findMusic:'/webapp/findMusic',
    //新增音频:POST
    uploadMusic:'/music/uploadMusic'
    
};

Vue.prototype.$apis = apis;