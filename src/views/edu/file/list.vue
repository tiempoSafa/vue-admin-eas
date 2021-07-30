<template>
  <div class="app-container">
    文件列表

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

<!--      <el-table-column prop="file" label="文件" >-->
<!--          <el-tag>-->
<!--            <i class="el-icon-download"/>-->
<!--            <a :href= "a">点击下载</a>-->
<!--          </el-tag>-->
<!--      </el-table-column>-->

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-tag>
            <i class="el-icon-download"/>
            <a :href=scope.row.file>点击下载</a>
          </el-tag>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
<!--    <el-pagination-->
<!--      :current-page="page"-->
<!--      :page-size="limit"-->
<!--      :total="total"-->
<!--      style="padding: 30px 0; text-align: center;"-->
<!--      layout="total, prev, pager, next, jumper"-->
<!--      @current-change="getList"-->
<!--    />-->

  </div>
</template>

<script>
  import file from '@/api/edu/file'

  export default {
    data(){     //定义标量和初始值
      return {
        list:null,//查询之后接口返回的集合
        total:0,//总记录数
        page:1,
        limit:10,
      }
    },
    created() {     //页面渲染之前执行，一般调用methods定义的方法
      this.getList()
    },
    methods:{
      getList() {
        file.findAllFile()
          .then(response =>{
            this.list = response.data.items
          })
      },
      removeDataById(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          file.deleteFileId(id)
            .then(response =>{
              //提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //回到列表
              this.getList()
            })


        })
      }
    }
  }
</script>

<style scoped>

</style>
