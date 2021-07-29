<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="csQuery.grade" placeholder="年级"/>
            </el-form-item>

            <el-form-item>
              <el-input v-model="csQuery.major" placeholder="专业"/>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>
            
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
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
        
            <el-table-column prop="grade" label="年级" width="100" />

            <el-table-column prop="major" label="专业" width="100" />

            <!-- <el-table-column prop="schedule" label="课表" width="150" /> -->

            <!-- <el-table-column label="课表2" width="200" align="center">
                
            </el-table-column> -->
            
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                <!-- <router-link :to="'/student/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link> -->
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
    <hr/>
    <el-table
      v-loading="listLoading"
      :data="schedule"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
              
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
              
      <el-table-column prop="monday" label="周一" width="100" />

      <el-table-column prop="tuesday" label="周二" width="100" />

      <el-table-column prop="wednesday" label="周三" width="100" />

      <el-table-column prop="thursday" label="周四" width="100" />

      <el-table-column prop="friday" label="周五" width="100" />

      <el-table-column prop="saturday" label="周六" width="100" />

      <el-table-column prop="sunday" label="周日" width="100" />

    </el-table>

  </div>
</template>

<script>
import classSchedule from '@/api/edu/classSchedule'

export default {

  data() {
    return {
      hideRequiredAsterisk:false,
      list:null,
      schedule:null,
      csQuery:{}
    }
  },
  created() {
    this.csQuery = {"grade":"0"}
    this.getList()
    this.csQuery = {}
  },  
  // watch: {
  //   filterText(val) {
  //     this.$refs.tree2.filter(val)
  //   }
  // },

  methods: {
    getList() {
      this.schedule = null
      classSchedule.getClassSchedule(this.csQuery)
        .then(response =>{
          this.list = response.data.list
          this.schedule = JSON.parse(this.list[0].schedule)
          console.log(this.list)
          console.log(this.schedule)
        })
    },
    resetData() {
      this.csQuery = {"grade":"0"}
      this.getList()
      this.csQuery = {}
    },
  }
}
</script>

