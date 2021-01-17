<template>
<div class="container">
    <div class="title">上传菜单</div>
    <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:3333/post",
    :headers="headers"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</div>
</template>
<script>
export default {
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
}
</script>
<style scoped lang="less">
.container{
    height: 100%;
    background-color: #ffffff;
    
    .title{
        font-size: 20px;
        font-weight: 500;
        padding: 15px;
    }
}

</style>
