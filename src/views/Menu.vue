<template>
<div class="container">
    <el-card>
      <div class="total">上传菜单</div>
    </el-card>
    <!-- <div>本周菜单</div> -->
    <el-card class="uploadBox">
      
      <el-upload
      class="upload-demo"
      ref="upload"
      action="/v1/manage/week-meals/upload"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :limit="1"
      :multiple="false"
      >
        <div>本周菜单</div>
        <div class="show">
            <img v-if="fileList.length" :src="url">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <!-- <div class="footer"></div> -->
        <el-button size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-card>

</div>
</template>
<script>
export default {
    data(){
      return {
        headers:{
          token:sessionStorage.getItem('token'),
          
        },
        fileList: []
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(file,fileList){
        console.log(file,fileList,this.fileList)
        this.fileList = fileList
      }
    }
}
</script>
<style scoped lang="less">
.container{
    height: 100%;
    // background-color: #ffffff;
    
    .total{
      margin-left: 15px;
      margin-bottom: 5px;
      // font-weight: 500;
      // font-size: 22px;
    }
    .total::before{
      content: "";
      display: inline-block;
      width: 5px;
      height: 20px;
      border-radius: 8px;
      background-color: #f77e5e;
      margin-right: 10px;
      vertical-align: middle;
    }



    .uploadBox{
      display: flex;
      justify-content: center;
      height: 100%;

      .upload-demo{
        // padding: 20px;
        margin: auto ;

        .show{
          width: 200px;
          min-height: 300px;
          border: 2px dashed #dddddd;
          display: flex;
          margin: 10px;

          i{
            display: block;
            margin: auto;
            // transform: translate(-50% -50%);
          }

          img{
            width: 100%;
            }
          }
        }
    }
      


    

    

}

</style>
