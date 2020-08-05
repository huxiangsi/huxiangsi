<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card" type="expand">
      <!-- 商品分类 列表区 添加分类按钮 -->
      <el-row class="addCatBtn">
        <el-col>
          <slot name="addCategorie">
            <addCategories @flushAddedCategories="getGoodsCategoriesList"></addCategories>
          </slot>
        </el-col>
      </el-row>
      <!-- 数据渲染区 -->
      <tree-table
        :data="goodsCategoriesList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
        class="tree-table"
      >
        <template slot="efficacy" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted == false" style="color : green"></i>
          <i class="el-icon-error" v-else style="color : red"></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>

        <template slot="operate" slot-scope="scope">
          <div class="operateButton">
            <!-- 商品分类 编辑按钮 组件 -->
            <slot name="editCategorie">
              <editButton :categorieInfo="scope.row" @flushEditedCategory="getGoodsCategoriesList"></editButton>
            </slot>
            <!-- 商品分类 删除按钮组件 -->
            <slot name="deleteCategorie">
              <deleteCategories
                :categorieInfo="scope.row"
                @flushEditedCategory="getGoodsCategoriesList"
              ></deleteCategories>
            </slot>
          </div>
        </template>
      </tree-table>
      <!-- 分页 页码条 -->
      <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="categoriesListLength"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
/* 按需导入 添加分类组件 */
const addCategories = () => import("./goods/categoriesComponents/addCategories")
/* 按需导入 商品分类编辑按钮 组件 */
const editButton = () => import("./goods/categoriesComponents/editButton")
/* 按需导入 商品分类删除按钮 组件 */
const deleteCategories = () =>
	import("./goods/categoriesComponents/deleteCategories")
export default {
	name: "categories",
	components: {
		editButton,
		deleteCategories,
		addCategories,
	},
	data() {
		return {
			/* 商品分类数据源 */
			goodsCategoriesList: [],
			/* 网络请求查询 参数 */
			queryInfo: {
				/* 当前在第几页 */
				pagenum: 1,
				/* 每页显示数据条数 */
				pagesize: 5,
				/* 请求的权限数据类型 */
				type: 3,
			},
			/* 查询到的数据总条数 */
			categoriesListLength: 0,
			/* 二级 和 三级 分类 节点 */
			defaultTreeProps: {
				label: "cat_name",
				children: "children",
			},
			/* 定义table列的定义 */
			columns: [
				/* 分类列 */
				{ label: "分类名称", prop: "cat_name" },
				/* 状态列 使用template模板  */
				{
					label: "是否有效",
					/* 表示当前列定义为模板列 */
					type: "template",
					/* 表示当前这一列使用模板名称 */
					template: "efficacy",
				},
				/* 排序列 使用template模板  */
				{
					label: "排序",
					/* 表示当前列定义为模板列 */
					type: "template",
					/* 表示当前这一列使用模板名称 */
					template: "order",
				},
				{
					label: "操作",
					type: "template",
					template: "operate",
				},
			],
		}
	},
	methods: {
		/* 获取商品分类 列表数据 */
		getGoodsCategoriesList() {
			this.$menu.get(`categories`, { params: this.queryInfo }).then((res) => {
				// console.log(res)
				if (res.data.meta.status !== 200) {
					/* 网络请求失败，返回失败信息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 网络请求成功 ， 将数据保存到data中去 */
					this.goodsCategoriesList = res.data.data.result
					/* 请求到的数据长度 保存到data中 */
					this.categoriesListLength = res.data.data.total
					// console.log(res.data.data.result)
				}
			})
		},
		/* 监听 每页显示数据条数 变化 */
		handlePageSizeChange(pageSize) {
			/* 把每页显示条数 数据变化 保存到 data中 作为网络请求的参数 */
			this.queryInfo.pagesize = pageSize
			/* 刷新分类列表 */
			this.getGoodsCategoriesList()
		},
		/* 监听当前页变化 */
		handleCurrentPageChange(pageNum) {
			/* 把当前是第几页 保存到data中 作为网络请求的参数 */
			this.queryInfo.pagenum = pageNum
			/* 刷新分类列表 */
			this.getGoodsCategoriesList()
		},
	},
	created() {
		/* 页面创建之前，请求到商品分类数据 */
		this.getGoodsCategoriesList()
	},
}
</script>

<style scoped>
/* 卡片区样式 */
.el-card {
	margin-top: 15px;
	height: 690px;
	overflow: scroll;
}
/* 添加分类按钮底下外边距 */
.addCatBtn {
	margin-bottom: 15px;
}
/* 添加table 下外边距样式 */
.tree-table {
	margin-bottom: 15px;
}
.operateButton {
	/* 操作列 按钮 样式 */
	display: flex;
	justify-content: space-around;
}
</style>