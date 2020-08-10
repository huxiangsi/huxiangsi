<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card>
      <!-- 提示消息 -->
      <el-alert title="添加商品信息" type="info" show-icon :closable="false" center></el-alert>
      <!-- 步骤条 -->
      <el-steps align-center :active="Number(activeIndex)">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- Form 表单 -->
      <el-form :model="addGoodsForm" :rules="addGoodsrules" ref="addGoodsRef">
        <!-- tabs 标签页 -->
        <el-tabs
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="goodsParamsTabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <!-- 基本信息表单 -->
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <!-- 商品价格 -->
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <!-- 商品重量 -->
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <!-- 商品数量 -->
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodsForm.goods_number"></el-input>
            </el-form-item>
            <!-- 商品分类 -->
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addGoodsForm.goods_cat"
                :options="categoriesList"
                :props="cascaderConfig"
                @change="handleCascaderChange"
                expandTrigger="hover"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单 动态参数数据 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in goodsDynamicParamsList"
              :key="item.attr_id"
            >
              <!-- 渲染 可多选 参数 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  :label="cb"
                  v-for="(cb, index) in item.attr_vals"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!-- 渲染表单 静态属性数据 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in goodsStaticAttrList"
              :key="item.attr_id"
            >
              <!-- 渲染 可多选 属性 -->
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <slot name="uploadPics">
              <upload @uploadSuccess="uploadResponse" @removePics="removeUploadedPics"></upload>
            </slot>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type="primary" @click="addBtnClick">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
/* 按需导入 上传图片组件 */
const upload = () => import("./addGoodsComponents/upload")
/* 按需导入 深拷贝组件 - lodash */
import _ from 'lodash'
export default {
	components: {
		upload,
	},
	data() {
		return {
			/* 进度条  */
			activeIndex: "",
			/* 添加商品表单对象 （数据源） */
			addGoodsForm: {
				goods_name: "",
				goods_price: 0,
				goods_weight: 0,
				goods_number: 0,
				/* 商品所属的分类 */
				goods_cat: [],
				/* 图片的数组 */
				pics: [],
				/* 商品描述 */
				goods_introduce: "",
				/* 商品 静态 和 动态 参数 */
				attrs:[]
			},
			/* 添加商品规则 */
			addGoodsrules: {
				goods_name: [
					{ required: true, message: "请输入商品名称", trigger: "blur" },
					{
						min: 1,
						max: 150,
						message: "长度在 1 到 150 个字符",
						trigger: "blur",
					},
				],
				goods_price: [
					{ required: true, message: "请输入商品价格", trigger: "blur" },
					{
						min: 1,
						max: 150,
						message: "长度在 1 到 150 个字符",
						trigger: "blur",
					},
				],
				goods_weight: [
					{ required: true, message: "请输入商品重量", trigger: "blur" },
					{
						min: 1,
						max: 150,
						message: "长度在 1 到 150 个字符",
						trigger: "blur",
					},
				],
				goods_number: [
					{ required: true, message: "请输入商品数量", trigger: "blur" },
					{
						min: 1,
						max: 150,
						message: "长度在 1 到 150 个字符",
						trigger: "blur",
					},
				],
			},
			/* 商品分类列表 */
			categoriesList: [],
			/* 级联选择器 渲染配置 */
			cascaderConfig: {
				label: "cat_name",
				value: "cat_id",
				children: "children",
			},
			/* 商品 三级分类 ID  */
			goodsCatId: 0,
			/* 商品 动态参数 数据 */
			goodsDynamicParamsList: {},
			/* 商品 静态属性 数据 */
			goodsStaticAttrList: {}
		}
	},
	methods: {
		/* 监听tabs点击事件 */
		goodsParamsTabClick(tag) {
			/* 把当前被点击的tag索引 保存到data中 作为 步骤条被激活的序号 */
			this.activeIndex = tag.name
			if (this.activeIndex === "1") {
				/* 如果当前索引 为‘1’ 代表活跃页面是 商品参数页 */
				/* 请求商品参数 数据 */
				this.$menu
					.get(`categories/${this.goodsCatId + ""}/attributes`, {
						params: { sel: "many" },
					})
					.then((res) => {
						//  console.log(res.data)
						if (res.data.meta.status !== 200) {
							/* 网络请求失败， 弹出失败消息 */
							this.$message.error(res.data.meta.msg)
						} else {
							/* 网络请求成功, 把商品参数数据保存到data中 */
							this.goodsDynamicParamsList = res.data.data
							// console.log(res.data.data)
							this.goodsDynamicParamsList.forEach(item => {
								item.attr_vals = item.attr_vals.length == 0 ? [] : item.attr_vals.split(' ')
							})
							
						}
					})
			} else if (this.activeIndex === "2") {
				/* 如果当前索引 为‘2’ 代表活跃页面是 商品属性页 */
				/* 请求商品参数 数据 */
				this.$menu
					.get(`categories/${this.goodsCatId + ""}/attributes`, {
						params: { sel: "only" },
					})
					.then((res) => {
						if (res.data.meta.status !== 200) {
							/* 网络请求失败， 弹出失败消息 */
							this.$message.error(res.data.meta.msg)
						} else {
							/* 网络请求成功, 把商品参数数据保存到data中 */
							this.goodsStaticAttrList = res.data.data	
							this.goodsStaticAttrList =res.data.data					
						}
					})
			}
		},
		/* 定义获取商品分类的方法 */
		getGoodsCategories() {
			this.$menu.get(`categories`).then((res) => {
				if (res.data.meta.status !== 200) {
					/* 如果网络请求失败， 弹出失败消息 */
					this.$message.error(res.data.meta.msg)
				} else {
					/* 网络请求成功 把商品分类数据 保存到data中 */
					this.categoriesList = res.data.data
					// console.log(res.data.data)
				}
			})
		},
		/* 监听 级联选择中的变化 */
		handleCascaderChange(val) {
			if (val.length == 3) {
				/* 如果选定了商品 三级分类  把商品分类id保存到data中*/
				this.goodsCatId = val[2]
			}
			/* 判断是否选中三级分类 */
			if (this.addGoodsForm.goods_cat.length !== 3) {
				this.addGoodsForm.goods_cat = []
			}
		},
		/* 监听 tag页 切换事件 */
		beforeTabLeave(to, from) {
			if (from === "0" && this.addGoodsForm.goods_cat.length !== 3) {
				/* 弹出提示消息 */
				this.$message.error("请选择商品分类")
				return false
			}
		},
		/* 图片上传成功 图片url保存到data商品图片数组中*/
		uploadResponse(response) {
			this.addGoodsForm.pics.push(response.data.tmp_path)
		},
		/* 图片删除成功， 把相应 的图片 从 图片数组中移除 */
		removeUploadedPics(file) {
			const u = file.response.data.tmp_path
			const i = this.addGoodsForm.pics.indexOf(u)
			this.addGoodsForm.pics.splice(i, 1)
			console.log(this.addGoodsForm.pics)
			// console.log(file)
			// console.log(file.response)
			// console.log(file.response)
			// console.log(file.response.data)
			// console.log(file.response.data.url)
		},
		/* 监听 添加商品按钮点击 事件 */
		addBtnClick() {
			/* 表单预验证 */
			this.$refs.addGoodsRef.validate((valid) => {
				if (!valid) {
					return this.$message.error("请填写添加商品必要项")
				} else {					
					const form = _.cloneDeep(this.addGoodsForm)
					form.goods_cat = form.goods_cat.join(',')
					/* 处理动态参数 */
					this.goodsDynamicParamsList.forEach(item => {
						const newInfo = {attr_id:item.attr_id, attr_value:item.attr_vals.join(' ')}
						this.addGoodsForm.attrs.push(newInfo)
					})
					/* 处理静态属性 */
					this.goodsStaticAttrList.forEach(item => {
						const newInfo = {attr_id:item.attr_id, attr_value:item.attr_vals}
						this.addGoodsForm.attrs.push(newInfo)
					})
					form.attrs = this.addGoodsForm.attrs
					this.$menu.post('goods', form).then(res => {
						if(res.data.meta.status !== 201){
							/* 创建商品失败 ，返回失败信息 */
							this.$message.error(res.data.meta.msg)
						}else{
							/* 创建商品成功，弹出创建成功消息 */
							this.$message.error(res.data.meta.msg)
							/* 返回到商品列表页面 */
							this.$router.push('/goods')
						}
					})
				}
			})
		},
	},
	created() {
		/* 页面创建之前， 获取所有商品的分类数据 */
		this.getGoodsCategories()
	},
}
</script>

<style scoped>
/* 设置card样式 */
.el-card {
	margin: 14px 0 0 0;
	height: 670px;
	overflow: scroll;
}
/* 步骤条样式 */
.el-steps {
	margin: 25px 0;
}
/* 可多选 参数 样式 */
.el-checkbox {
	margin: 0 10px 0 0 !important;
}
/* 添加商品按钮 */
.el-button {
	margin-top: 15px;
}
</style>