<template>
  <div>
    <!-- 编辑按钮 -->
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      slot="editButton"
      @click="editButtonClick"
    ></el-button>
    <!-- 添加商品 对话框 -->
    <el-dialog title="编辑商品" :visible.sync="showEditGoodsDialog" width="50%">
      <!-- 编辑商品表单 -->
      <el-form
        :model="queryInfo"
        :rules="editGoodsRules"
        ref="editGoodsFormRef"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="queryInfo.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="queryInfo.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品编号" prop="goods_number">
          <el-input v-model="queryInfo.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="queryInfo.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="goods_introduce">
          <el-input v-model="queryInfo.goods_introduce"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="goods_introduce">
          <el-input v-model="queryInfo.pics"></el-input>
        </el-form-item>
        <el-form-item label="商品参数（属性）" prop="goods_introduce">
          <el-input v-model="queryInfo.attrs"></el-input>
        </el-form-item>
      </el-form>
      {{goodsInfo.goods_id}}
      {{goodsInfo.goods_name}}
      {{queryInfo}}
      <!-- 编辑商品对话框 取消 与 确定按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditGoods">取 消</el-button>
        <el-button type="primary" @click="sureEditButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	props: ["goodsInfo"],
	data() {
		return {
			/* 控制对话框显示与隐藏 */
			showEditGoodsDialog: false,
			/* 网络请求数据 */
			queryInfo: {
				goods_name: this.goodsInfo.goods_name,
				goods_price: this.goodsInfo.goods_price,
				goods_number: this.goodsInfo.goods_number,
				goods_weight: this.goodsInfo.goods_weight,
				goods_introduce: '',
				pics: '',
				attrs: '',
			},
			/* 编辑 商品详情 规则 */
			editGoodsRules: {
				goods_name: [
					{ required: true, message: "请输入商品名称", trigger: "blur" },
					{ min: 1, max: 150, message: "长度在 1 到 150 个字符", trigger: "blur", }
                ],
                goods_price: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{ min: 1, max: 150, message: "长度在 1 到 150 个字符",  trigger: "blur" },
                ],
                goods_number: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{ min: 1, max: 150, message: "长度在 1 到 150 个字符", trigger: "blur" },
                ],
                goods_weight: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{ min: 1, max: 150, message: "长度在 1 到 150 个字符",  trigger: "blur" },
				]
			},
		}
	},
	methods: {
		/* 监听编辑按钮点击事件 */
		editButtonClick() {
			/* 弹出编辑对话框 */
			this.showEditGoodsDialog = true
		},
		/* 监听 取消编辑按钮 事件 */
		cancelEditGoods() {
			/* 关闭对话框 */
			this.showEditGoodsDialog = false
			/* 弹出 取消编辑 商品消息 */
			this.$message.error("取消编辑商品")
		},
		/* 监听 确定修改商品列表按钮 */
		sureEditButton() {
            /* 表单预验证 */
            this.$refs.editGoodsFormRef.validate(valid => {
                if(!valid){
                    /* 表单预验证失败 */
                    return 
                }else{
                    /* 表单预验证成功， 发起修改商品的网络 */
                    this.$menu.put(`goods/${this.goodsInfo.goods_id}`, this.queryInfo).then(res => {
                        console.log(res)
                    })
                }
                
            })
        },
	},
}
</script>

<style>
</style>