<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品列表区 -->
    <el-card>
      <el-row :gutter="20">
        <!-- 搜索框区 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getGoodsList()'>
            <el-button slot="append" icon="el-icon-search" @click='getGoodsList()'></el-button>
          </el-input>
        </el-col>
        <!-- 添加商品按钮 -->
        <el-col :span="4" class="addGoodsButton">
          <el-button type="primary" @click='addGoodsButtonClick'>添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 数据渲染区 -->
      <el-table :data="goodsList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 商品名称列 -->
        <el-table-column label="商品名称" prop="goods_name" width="400px"></el-table-column>
        <!-- 商品价格列 -->
        <el-table-column label="商品价格（元）" prop="goods_price"></el-table-column>
        <!-- 商品重量列 -->
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <!-- 创建时间列 -->
        <el-table-column label="创建时间" prop="add_time">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operateButton">
              <!-- 编辑按钮插槽 -->
              <slot name="editButton">
                <editButton :goodsInfo='scope.row'></editButton>
              </slot>
              <!-- 删除按钮插槽 -->
              <slot name="deleteButton">
                <deleteButton :goodsInfo='scope.row' @flushDeletedList='getGoodsList'></deleteButton>
              </slot>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页显示 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
/* 按需导入编辑按钮 组件 */
const editButton = () => import("./goods/goodsList/editButton")
/* 按需导入删除按钮 组件 */
const deleteButton = () => import("./goods/goodsList/deleteButton")
export default {
	name: "goods",
	components: {
		editButton,
		deleteButton
	},
	data() {
		return {
			/* 商品列表数组 */
			goodsList: [],
			/* 总数据条数 */
			total: 0,
			/* 网络请求参数对象 */
			queryInfo: {
				/* 查询参数(绑定到 表单搜索框) */
				query: "",
				/* 当前页码 */
				pagenum: 1,
				/* 每页显示的条数 */
				pagesize: 10,
			},
		}
	},
	created() {
		/* 页面创建之前 发起获取商品列表的网络请求 */
		this.getGoodsList()
	},
	methods: {
		/* 获取商品列表 */
		getGoodsList() {
			/* 获取商品列表的网络请求 */
			this.$menu.get(`goods`, { params: this.queryInfo }).then((res) => {
				if (res.data.meta.status !== 200) {
					/* 网络请求失败，弹出失败消息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 查询成功, 将请求到的数据保存到data中去 */
					this.goodsList = res.data.data.goods
					console.log(res.data.data.goods)
					/* 查询到的总的数据条数 保存到data中 ，作为分页显示的数据源 */
					this.total = res.data.data.total
				}
			})
		},
		/* 监听 每页多少条 事件 */
		handleSizeChange(pagesizeChange) {
			// console.log(`每页显示数据变化${pagesizeChange}`)
			this.queryInfo.pagesize = pagesizeChange
			/* 当前页显示的数据条数 发生变化， 刷新列表 */
			this.getGoodsList()
		},
		/* 监听当前第几页 */
		handleCurrentChange(pageNumChange) {
			// console.log(`当前第${pageNumChange}页`)
			this.queryInfo.pagenum = pageNumChange
			/* 当前页显示发生变化， 刷新列表 */
			this.getGoodsList()
    },
    /* 监听 添加商品按钮点击 事件 */
    addGoodsButtonClick(){
      /* 跳转到 添加商品页面 */
      this.$router.push('/addGoods')
    }
	},
}
</script>

<style scoped>
/* 设置数据渲染页面的样式 */
.el-card .el-table {
	height: 550px;
	overflow: scroll;
}
/* 面包屑导航下边距 */
.el-breadcrumb {
	margin-bottom: 15px;
}
/* 设置表格 上下 外边距 */
.el-table {
	margin: 15px 0;
}
/* 设置按钮样式 */
.operateButton{
  display: flex;
  justify-content: space-around;
}
</style>