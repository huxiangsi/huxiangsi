<template>
    
            <!-- 动态切换菜单尺寸 -->
  <el-aside :width="isCollapse ? '64px': '200px'">
      <!-- 菜单折叠 打开按钮 -->
      <div class="menuToggle" @click="ToogleClick">|||</div>
    <!-- 菜单区 -->
    <el-menu background-color="#333744" 
    text-color="#fff" 
    active-text-color="#409eff" 
    :unique-opened='true' 
    :collapse='isCollapse' 
    :collapse-transition='false'
    :router='true'>
      <!-- 一级菜单 -->
      <el-submenu :index="''+ item.id" v-for="item in menuList" :key="item.id">
        <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="'el-icon-'+ menuListIcon[item.id]"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
          <!-- 二级菜单 -->
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="'/' + item.path" v-for="item in item.children" :key="item.id" 
    :default-active="'/' + 'item.path'">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
	name: "homeAside",
	data() {
		return {
			menuList: [],
			/* 一级菜单图标渲染 */
			/* 动态渲染，把网络请求获取到的数据的id作为，渲染图标对象的属性名 */
			menuListIcon: {
				"125": "user",
				"103": "mouse",
				"101": "goods",
				"102": "tickets",
				"145": "s-data",
            },
            /* 菜单折叠与展开 */
            isCollapse:false
		}
	},
	created() {
		this.requestData()
	},
	methods: {
		requestData() {
			/* 发起菜单区网络请求 */
			this.$menu.get("menus").then((res) => {
				// console.log(res.data.data)
				if (res.data.meta.status !== 200)
					return this.$message.error(res.data.meta.msg)
				this.menuList = res.data.data
			})
        },
        ToogleClick(){
            this.isCollapse = !this.isCollapse
        }
	},
}
</script>

<style>
.el-menu{
    border-right: none;
}
.el-aside {
    background-color: #333744;
}
/* 菜单折叠按钮 */
.menuToggle{
    height: 24px;
    width: auto;
    background-color: rgb(95, 91, 102);
    font-size: 15px;
    text-align: center;
    letter-spacing: 3px;
    color: #fff;
    line-height: 24px;
    cursor: pointer;
    font-weight: 900;
}   
</style>