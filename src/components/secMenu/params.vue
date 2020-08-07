<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- el-card 主体区 -->
    <el-card>
      <!-- {{selectedKeys}} -->
      <!-- 警告提示 -->
      <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" show-icon></el-alert>
      <!-- 商品分类 级联渲染 -->
      <span>选择商品分类:</span>
      <el-cascader
        v-model="selectedKeys"
        :options="goodsCategories"
        :props="goodsCategoriesShowConfig"
        @change="cascaderChange"
        expandTrigger="hover"
        clearable
        :checkStrictly="false"
      ></el-cascader>
      <!-- 商品参数 标签页 -->
      <el-tabs v-model="activeLabel" @tab-click="toggleLabel">
        <el-tab-pane label="动态参数" name="dynamic">
          <el-row class="slotButton">
             <slot name='addParamsBtn'><addParamsButton :activeTag='activeLabel' 
             :currentCategoryId='choosedCategoriesId' @invokeFlushPramasListFn='flushParamsList'></addParamsButton></slot>       
          </el-row>
          <!-- 添加动态参数 表单区 插槽 -->
          <slot name="dynamicParam">
            <dynamicParams :goodsCategoryId="choosedCategoriesId" ref="dynamicParams"></dynamicParams>
          </slot>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="static">
          <el-row class="slotButton">
            <!-- <el-button type="primary" size="mini" :disabled="isShowAddButton">添加属性</el-button> -->
             <slot name='addParamsBtn'><addParamsButton :activeTag='activeLabel' :currentCategoryId='choosedCategoriesId'></addParamsButton></slot>
          </el-row>
          <slot name="staticAttr">
            <staticAttrs :goodsCategoryId="choosedCategoriesId" ref="staticAttrs"></staticAttrs>
          </slot>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
/* 按需导入 动态参数 组件 */
const dynamicParams = () => import("./params/dynamicParams")
/* 按需导入 静态属性 组件 */
const staticAttrs = () => import("./params/staticAttrs")
/* 按需导入 添加参数按钮 组件 */
const addParamsButton = () => import('./params/addParamsButton')
export default {
	name: "params",
	components: {
		dynamicParams,
    staticAttrs,
    addParamsButton
	},
	data() {
		return {
			/* 商品 三级 分类  数据源*/
			goodsCategories: [],
			/* 已选择的 三级分类id */
			selectedKeys: [],
			/* 商品分类渲染 配置 */
			goodsCategoriesShowConfig: {
				value: "cat_id",
				label: "cat_name",
				children: "children",
			},
			/* el-tag 活跃标签  设置默认标签*/
			activeLabel: "dynamic",
			/* 选定 的商品分类 的 id */
			choosedCategoriesId: 0,
		}
	},
	created() {
		/* 页面创建之前, 请求商品分类数据 */
		this.getGoodsCategories()
	},
	methods: {
		/* 请求分类参数数据 */
		getGoodsCategories() {
			/* 请求三级分类 */
			this.$menu.get(`categories`, { params: { type: 3 } }).then((res) => {
				if (res.data.meta.status !== 200) {
					/* 网络请求失败, 返回失败信息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 网络请求成功, 把请求到的 三级分类数据保存到data中 */
					this.goodsCategories = res.data.data
				}
			})
		},
		/* 监听 级联 选择器中的 变化 事件 */
		cascaderChange(val) {
			/* 判断是否有分类被选中 */
			if (val.length !== 3) {
				/* 如果 监听的数组长度为 0 说明 没有选择任何分类 */
				this.selectedKeys = []
				return
			} else {
				/* 用户选择了分类, 数组的最后一位  就是 末级分类, 保存到data中去 */
				this.choosedCategoriesId = val[val.length - 1]
			
			/* 发起获取动态参数列表网络请求 */
			// this.$refs.dynamicParams.getDynamicParamsList()
			/* 发起获取静态属性列表网络请求 */
      // this.$refs.staticAttrs.getStaticAttrs()
       // console.log(this.activeLabel)
        if(this.activeLabel == 'dynamic'){
          /* 发起获取动态参数列表网络请求 */
          this.$refs.dynamicParams.getDynamicParamsList()
          //刷新参数列表
          this.flushParamsList()
        }else{
          /* 发起获取静态属性列表网络请求 */
          this.$refs.staticAttrs.getStaticAttrs()
          //刷新参数列表
          this.flushParamsList()
        }			
      }  
		},
		/* 监听 切换 标签页 事件 */
		toggleLabel() {
      // console.log(this.activeLabel)
      if(this.activeLabel == 'dynamic'){
        /* 发起获取动态参数列表网络请求 */
        this.$refs.dynamicParams.getDynamicParamsList()
        // console.log('toggle dynamic')
      }else{
        /* 发起获取静态属性列表网络请求 */
        this.$refs.staticAttrs.getStaticAttrs()
        // console.log('toggle static')
      }			
    },
    /* 调用 刷新参数列表 函数事件 */
    flushParamsList(){
      /* 判断当前活跃的tag, 刷新相应的参数列表 */
      if(this.activeLabel == 'dynamic'){
        /* 如果处于 动态参数tag 则调用动态参数的函数 刷新 动态参数的列表 */
        this.$refs.dynamicParams.getDynamicParamsList()
        // console.log('dynamic')
      }
      if(this.activeLabel == 'static'){
        /* 如果处于 静态属性tag 则调用动态参数的函数 刷新 动态参数的列表 */
        this.$refs.staticAttrs.getStaticAttrs()
        // console.log('static')
      }
    }
	}
}
</script>

<style scoped>
/* el-card 上外边距样式 */
.el-card {
	margin-top: 25px;
}
/* 设置 el-laert 下外边距 */
.el-alert {
	margin-bottom: 15px;
}
/* 设置 cascading 下外边距 */
.el-cascader {
	margin-bottom: 15px;
}
/* 设置 按钮 下外边距 样式 */
.slotButton {
	margin-bottom: 25px;
}
</style>