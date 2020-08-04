<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区 -->
    <el-card>
      <!-- 添加用户按钮 -->
      <el-row>
        <el-col>
          <slot name='addUser'><addRoles @updateRolesList='getRolesData'></addRoles></slot>
        </el-col>
      </el-row>

      <!-- 表单区 -->
      <el-table :data="rolesList" border stripe>
        <!-- 当前角色权限列表 详情按钮 -->
        <el-table-column type="expand" default-expanded-keys class="el_table_column_RightsLevel">
          <template slot-scope="scope">
            <el-row v-for="(item1, i1) in scope.row.children" :key="item1.id" :class="['bdBottom', i1 == 0 ? 'bdTop' : 0, 'rightsStyle']">
              <!-- 一级权限 列表渲染 -->
              <el-col :span='5'><el-tag closable  @close='removeRightsLick(scope.row, item1.id)'>{{item1.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col>
              <!-- 二级 和 三级权限 列表渲染 -->
              <el-col :span='19'>
                <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="['brTop', i2 === 0 ? '' : 'bdTop',  'rightsStyle']">
                  <!-- 二级权限 列表渲染 -->
                  <el-col :span='6'><el-tag type='success' closable  @close='removeRightsLick(scope.row, item2.id)'>{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col>
                  <!-- 三级权限 列表渲染 -->
                  <el-col :span='18'>
                    <!-- 三级权限渲染 -->                    
                      <el-tag type='warning' v-for="(item3) in item2.children" :key="item3.id" closable 
                      @close='removeRightsLick(scope.row, item3.id)'>{{item3.authName}}</el-tag>                    
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>{{scope.row}}</pre> -->
          </template>
        </el-table-column>
        <!-- 角色列表 表单主体区 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" class="el_table_column_operate">
          <template slot-scope="scope">
            <!-- 表单区 操作列 功能按钮 -->
            <!-- 编辑按钮 -->
            <slot name="editRole">
              <editRoles :roleInfo='scope.row' @updateRoleEdited='getRolesData'></editRoles>
            </slot>
            <!-- 删除按钮 -->
            <slot name="deleteRole">
              <deleteRoles :deleteRole='scope.row' @flushDeletedRolesList='getRolesData'></deleteRoles>
            </slot>
            <!-- 分配权限 按钮 -->
            <slot name="allotRight">
              <allotRights :currentRole='scope.row' @flushRoleRights='getRolesData'></allotRights>
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
/* 按需导入 添加用户  按钮组件 */
const addRoles = () => import('./rolesListComponents/addRoles')
/* 按需导入编辑角色组件 */
const editRoles = () => import("./rolesListComponents/editRoles")
/* 按需导入删除角色组件 */
const deleteRoles = () => import("./rolesListComponents/deleteRoles")
/* 按需导入 分配权限 组件 */
const allotRights = () => import("./rolesListComponents/allotRights")
export default {
	name: "roles",
	components: {
		editRoles,
		deleteRoles,
		allotRights,
    addRoles
	},
	data() {
		return {
			/* 定义 角色列表 数据源 */
			rolesList: [],
		}
	},
	methods: {
		/* 定义获取角色数据的方法 */
		getRolesData() {
			/* 发起获取 角色列表 数据的网络请求 */
			this.$menu.get("roles").then((res) => {
				if (res.data.meta.status !== 200) {
					/* 如果获取数据失败， 弹出失败消息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 如果获取 角色列表数据 成功， 保存到data中 作为数据源 */
					this.rolesList = res.data.data
				}
			})
    },
    /* 监听移除角色权限按钮 事件 */
    removeRightsLick(role, rightId){
      /* 弹出提示框 */
        this.$confirm('此操作将永久删除该角色权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
            this.$menu.delete(`roles/${role.id}/rights/${rightId}`).then(res => {
              // console.log(res.data.data);
              /* 网络请求成功 返回成功信息 */
              this.$message.success('取消角色权限成功！')
              /*  1.此次网络请求返回的data, 是当前角色下最新的权限数据
                  2.调用刷新列表函数，会重新渲染页面
                  3.把此次网络请求返回值覆盖已有的数据  */
              role.children = res.data.data
            })
        }).catch(err => {
          this.$message.error('取消移除角色权限')
        })

          

       
    }
	},
	created() {
		/* 在页面创建之前，调用获取 角色列表数据 的方法 */
    this.getRolesData()
	},
}
</script>

<style scoped>
/* 设置操作列 按钮 样式 */
.el-table .cell{
  display: flex;
  justify-content: space-between;
}
.el-table .cell div{
  display: inline-block;
  margin: 0 10px;
}
/* 设置el-card 据顶部距离 -- card最大高度， 超出部分scroll*/
.el-card {
	margin-top: 15px;
  max-height: 750px;
  overflow: scroll;
}
/* 添加用户按钮 和 表单区的间距 */
.addUserButton {
	margin-bottom: 15px;
}
/* 给权限tag加边框线 */
.el-tag{
  margin: 7px;
}
/* 上边框线 */
.bdTop{
  border-top: 1px solid #eee ;
}
/* 下边框线 */
.bdBottom{
  border-top: 1px solid #eee ;
}
/* 权限tag样式 */
.rightsStyle{
  display: flex;
  align-items: center;
  
}
</style>