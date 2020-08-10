<template>
  <div>
    <!-- 上传图片组件 -->
    <el-upload
      :action="uploadURL"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      :headers="headerObj"
      :on-success="onSuccess"
    >
      <!-- 上传图片 按钮 -->
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- 点击文字 预览图片 -->
    <el-dialog title="图片预览" :visible.sync="showPreviewPic" width="50%">
      <img :src="currentPicUrl" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
export default {
	data() {
		return {
			/* 上传的图片列表 */
			fileList: [],
			/* 上传图片的地址 */
			uploadURL: "http://127.0.0.1:8888/api/private/v1/upload",
			/* 上传图片 请求头对象 */
			headerObj: {
				Authorization: window.sessionStorage.getItem("token"),
            },
            /* 图片预览对话框的显示与隐藏 */
            showPreviewPic:false,
            /* 当前图片url */
            currentPicUrl:''
		}
	},
	methods: {
		/* 点击图片上文字时的钩子 */
		handlePreview(file) {
            /* 把当前图片url保存到data中 */
            this.currentPicUrl = file.response.data.url
            /* 弹出对话框 */
            this.showPreviewPic = true
            console.log(file)
            console.log(file.response.data.url)
		},
		/* 文件列表移除文件时的钩子 */
		handleRemove(file) {
			this.$emit("removePics", file)
		},
		/* 图片上传成功时的钩子 */
		onSuccess(response, file, fileList) {
			this.$emit("uploadSuccess", response)
		},
	},
}
</script>

<style>
</style>