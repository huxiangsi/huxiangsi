<template>
  <div>
    <!-- 分配权限按钮 -->
    <el-button size="mini" type="warning" icon="el-icon-setting" slot="allotRight" @click="allotRightsButtonClick(currentRole)">分配权限</el-button>
    <!-- 分配权限树形数据列表 -->
    <el-dialog title="分配权限" :visible.sync="showAllotRightsDialogue" width="70%">
        <!-- 表单主体区 -->
      <el-tree :data="treeRightsList" :props="childTreeProps" 
      show-checkbox node-key='id' default-expand-all 
      :default-checked-keys='currentRoleRights'
      ref="checkedKeys"></el-tree>
      <!-- 表单取消与确认按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAllotRights">取 消</el-button>
        <el-button type="primary" @click="sureAllotRights(currentRole)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-tree :data="treeRightsList" :props="childTreeProps"></el-tree> -->
  </div>
</template>

<script>
export default {
    name: "allotRights",
    props:['currentRole'],
	data() {
		return {
			/* 树形 权限列表 数据源 */
			treeRightsList: [],
			/* 子树节点 字段对象 */
			childTreeProps: {
				children: "children",
				label: 'authName',
            },
            /* 分配权限 对话框 隐藏与显示 */
            showAllotRightsDialogue:false,
            /* 当前 角色 已经拥有的 权限 */
            currentRoleRights:[],
            /* 待确定 分配权限 的数据 */
            // awaitAllotRights:[] 
		}
    },
    methods:{
        /* 监听 分配权限按钮 事件 */
        allotRightsButtonClick(currentRole){
            /* 调用 获取 当前角色三级权限id 的递归函数*/
            // console.log(currentRole)
            this.getCurrentThirdRights(currentRole, this.currentRoleRights)
            /* 打开对话框 */
            this.showAllotRightsDialogue = !this.showAllotRightsDialogue
        },
        /* 监听取消分配权限按钮事件 */
        cancelAllotRights(){
            /* 关闭窗口 */
            this.showAllotRightsDialogue = false
            /* 弹出取消分配权限消息 */
            this.$message.error('取消分配权限');
        },
        /* 监听 确定分配权限按钮 事件 */
        sureAllotRights(currentRole){
            /* 获取当前被全选中的三级权限 */
            const checkedKeys = this.$refs.checkedKeys.getCheckedKeys()
            /* 获取当前被半选中的一级和二级权限 */
            const halfCheckedKeys = this.$refs.checkedKeys.getHalfCheckedKeys()
            /* 把所有 全选的三级权限 和半选的 一级、二级权限，保存到data中 待分配权限 数据源中 */
            const awaitAllotRights = [...checkedKeys, ...halfCheckedKeys].join(',')
            // console.log(awaitAllotRights)
            /* 发起分配权限网络请求 */
            this.$menu.post(`roles/${currentRole.id}/rights`,{rids:awaitAllotRights}).then(res => {
                if(res.data.meta.status !== 200){
                    /* 分配权限失败 ，弹出失败消息 */
                    this.$message.error(res.data.meta.msg)
                }else{
                    /* 弹出分配权限成功消息 */
                    this.$message.success(res.data.meta.msg)
                    /* 分配权限成功，刷新角色列表 */
                    this.$emit('flushRoleRights')
                    /* 关闭窗口 */
                    this.showAllotRightsDialogue = false 
                }
            })
            
        },
        /* 发起 树形 权限列表 网络请求，  */
        getTreeRightsList(){
            this.$menu.get(`rights/tree`).then(res => {
                if(res.data.meta.status !== 200){
                    /* 数据请求失败 弹出失败消息 */
                    this.$message.error(res.data.meta.msg)
                }else{
                    /* 数据请求成功，把数据保存到data中 作为数据源 */
                    this.treeRightsList = res.data.data
                }
            })
        },
        /* 定义递归函数 获取当前角色的三级权限id */
        getCurrentThirdRights(roleRight, idArr){
            if(!roleRight.children){
                return idArr.push(roleRight.id)
            }else{
                roleRight.children.forEach(rr => {
                    this.getCurrentThirdRights(rr, idArr)
                });
            }
        }
    },
    /* 页面创建之前 发起网络请求 获取 权限列表数据 */
    created(){
        this.getTreeRightsList();
    }
}
</script>

<style scoped>

</style>