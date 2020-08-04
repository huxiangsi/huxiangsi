<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 面包屑导航 -->
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 添加用户区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <!-- 添加用户按钮 插槽 -->
          <slot name="addUserButton">
            <addUserButton @updateUserList="getUsersList"></addUserButton>
          </slot>
        </el-col>
      </el-row>
      <!-- 表单数据展示区 -->
      <el-table style="width: 100%" :data="usersListData" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStatuChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-row>
              <el-col>
                <!-- 修改用户信息插槽 -->
                <slot name="editUserInfo">
                  <editUserInfo :userInfo="scope.row" @editUsersInfoEvent="getUsersList"></editUserInfo>
                </slot>
                <!-- 删除用户 插槽 -->
                <slot name="deleteUser">
                  <deleteUser :sureDeleteUser="scope.row" @sureDeleteUserEvetn="getUsersList"></deleteUser>
                </slot>
				<el-tooltip ceffect="dark" content="分配角色" placement="top" :enterable="false">
                <slot name="allotRole">
					<allotRoles :userInfo='scope.row' @flushAllotedList='getUsersList'></allotRoles>
				</slot>
				</el-tooltip>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页导航区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
/* 按需导入添加用户按钮 组件 */
const addUserButton = () => import("./addUser/addUser")
/* 按需导入修改用户信息 组件 */
const editUserInfo = () => import("./addUser/editUserInfo")
/* 按需导入删除用户信息 组件 */
const deleteUser = () => import("./addUser/deleteUser")
/* 按需导入分配角色 组件 */
const allotRoles = () => import('./addUser/allotRoles')
export default {
	name: "users",
	components: {
		addUserButton,
		editUserInfo,
		deleteUser,
		allotRoles
	},
	methods: {
		/* 定义网络请求方法 */
		getUsersList() {
			this.$menu.get("users", { params: this.queryInfo }).then((res) => {
				// console.log(res.data.data)
				// console.log(res.data.data.users[0].role_name)
				if (res.data.meta.status !== 200)
					return this.$message.error(res.data.meta.msg)
				this.usersListData = res.data.data.users
				this.total = res.data.data.total
			})
		},
		/* 监听 每页显示数量的事件 */
		handleSizeChange(newPageSize) {
			// 把用户操作页面的最新数据，保存到data中，作为网络请求的参数
			this.queryInfo.pagesize = newPageSize
			//重新向请求数据，调用方法，并重新渲染
			this.getUsersList()
		},
		/* 监听 当前页码的 事件 */
		handleCurrentChange(newPageNum) {
			// 把用户操作页面的最新数据，保存到data中，作为网络请求的参数
			this.queryInfo.pagenum = newPageNum
			//重新向服务器发起网络数据请求，并重新渲染
			this.getUsersList()
		},
		/* 监听 用户状态发生变化 事件 */
		userStatuChanged(userInfo) {
			// console.log(userInfo)
			this.$menu
				.put("users/" + userInfo.id + "/state/" + userInfo.mg_state)
				.then((res) => {
					if (res.data.meta.status !== 200) {
						//如果修改状态失败，立即让页面上的开关关闭,保证页面按钮不做变化
						userInfo.mg_state = !userInfo.mg_state
						return this.$message.error(res.data.meta.msg)
					} else {
						//如果成功，对用户做出提示
						this.$message.success(res.data.meta.msg)
					}
				})
		},
	},
	data() {
		return {
			/* 发起axios数据请求的参数 */
			/* query属性值，作为搜索的参数 */
			queryInfo: {
				query: "",
				/* 当前第几页 */
				pagenum: 1,
				/* 当前每页显示多少条数据 */
				pagesize: 2,
			},
			usersListData: [],
			total: 0,
		}
	},
	created() {
		/* 页面数据创建时，调用网络请求方法 */
		this.getUsersList()
	},
}
</script>

<style scoped>
/* 数据展示区样式 */
.el-card {
	margin-top: 20px;
	box-shadow: 0 0 1px rgb(0, 0, 0, 0.3);
}
/* 数据表格渲染样式 */
.el-table {
	margin-top: 10px;
}
/* 分页导航样式 */
.el-pagination {
	margin-top: 25px;
}
/* 操作列 按钮样式 */
.el-table td div{
	display: flex;
	margin: 0 4px;
	/* align-items: center; */
	/* align-content: space-around; */
}
</style>