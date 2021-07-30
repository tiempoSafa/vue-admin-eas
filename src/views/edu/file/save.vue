<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="选择文件">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduoss/fileoss'"
          class="file-uploader">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import file from '@/api/edu/file'

  export default {
    data() {
      return {
        BASE_API: process.env.BASE_API, // 接口API地址
        OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false,
        file:{}
      }
    },
    created() {

    },
    methods:{
      submitUpload() {
        this.fileUploadBtnText = '正在上传'
        this.importBtnDisabled = true
        this.loading = true
        this.$refs.upload.submit()
      },
      fileUploadSuccess(response,f) {
        // console.log(f.name)
        this.file.name = f.name
        this.file.file = response.data.url
        console.log(this.file)
        file.addFile(this.file)
          .then(response =>{
            this.loading = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            //路由跳转
            this.$router.push({ path: '/file/table' })
          })

        // this.loading = false
        // this.$message({
        //   type: 'success',
        //   message: '导入成功'
        // })

        //路由跳转
        // this.$router.push({path:'/file/table'})
      },
      fileUploadError() {
        this.loading = false
        this.$message({
          type: 'error',
          message: '导入失败'
        })
      }
    }
  }
</script>

<style scoped>

</style>
