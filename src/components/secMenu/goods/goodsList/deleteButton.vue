<template>
  <div>
    <!-- 删除按钮 -->
    <el-button
      size="mini"
      type="danger"
      icon="el-icon-delete"
      slot="deleteButton"
      @click="deleteButtonClick"
    ></el-button>
  </div>
</template>

<script>
export default {
    props:['goodsInfo'],
	data() {
		return {
			/* 控制对话框 显示与隐藏 */
			showDeleteGoodsDialog: false,
		}
	},
	methods: {
		/* 监听删除按钮事件 */
		deleteButtonClick() {
			/* 弹出确认对话框 */
			this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
            }).then(() => {
                //发起删除商品网络请求
                this.$menu.delete(`goods/${this.goodsInfo.goods_id}`).then(res => {
                    console.log(res)
                    if(res.data.meta.status !== 200){
                        /* 删除失败 弹出失败消息 */
                        this.$message.error(res.data.meta.msg)
                    }else{
                        /* 网络请求成功 ， 刷新列表 */
                        this.$emit('flushDeletedList')
                        /* 弹出成功消息 */
                        this.$message.success(res.data.meta.msg)
                    }
                })
            })
              .catch(() => {
                  /* 取消删除， 弹出取消消息 */
                  this.$message.error('取消删除商品')
              })
		},
	},
}
</script>

<style scoped>
.el-button {
	display: flex;
	justify-content: space-between;
}
</style>