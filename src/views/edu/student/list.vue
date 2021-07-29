<template>
    <div class="app-container">
        学生列表

        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="studentQuery.name" placeholder="学生名"/>
            </el-form-item>

            <el-form-item>
                <el-select v-model="studentQuery.sex" clearable placeholder="性别">
                    <el-option :value="1" label="男"/>
                    <el-option :value="2" label="女"/>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-select v-model="studentQuery.institute" clearable placeholder="学院">
                    <!-- <el-option :value: '电信学院' label="电信学院"/>
                    <el-option :value: '经管学院' label="经管学院"/> -->
                    <el-option
                        v-for="item in institutes"
                        :key="item.id"   
                        :label="item.institute"
                        :value="item.id"
                        />
                </el-select>
            </el-form-item>

            <el-form-item label="添加时间">
                <el-date-picker
                    v-model="studentQuery.begin"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                />
            </el-form-item>
            <el-form-item>
                <el-date-picker
                    v-model="studentQuery.end"
                    type="datetime"
                    placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                />
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>

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
        
            <el-table-column prop="name" label="名字" width="100" />

            <el-table-column prop="stuId" label="学号" width="100" />

            <el-table-column prop="password" label="密码" width="100" />
            
            <el-table-column label="性别" width="80">
                <template slot-scope="scope">
                    {{ scope.row.sex===1?'男':'女' }}
                </template>
            </el-table-column>

            <el-table-column prop="email" label="邮箱" width="150" />
        
            <!-- <el-table-column label="学院" width="80"> -->
                <!-- <template slot-scope="scope"> -->
                    <!-- {{ scope.row.institute===1?'电信学院':'经管学院' }} -->
                <!-- </template> -->
            <!-- </el-table-column> -->
            <!-- <el-table-column prop="institute" label="学院" width="80" /> -->
            
            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
            
            <el-table-column prop="sort" label="排序" width="60" />
            
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                <router-link :to="'/student/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
        />

    </div>
</template>

<script>
//一如调用student.js
import student from '@/api/edu/student'
import institute from '@/api/edu/institute'

export default {
    //核心代码
    data(){     //定义标量和初始值
        return {
            list:null,//查询之后接口返回的集合
            total:0,//总记录数
            page:1,
            limit:10,
            studentQuery:{},
            // institutes: [{
            //     value: '0',
            //     label: '电信学院'
            // }, {
            //     value: '1',
            //     label: '经管学院'
            // }]
            institutes:[]

        }
    },
    created() {     //页面渲染之前执行，一般调用methods定义的方法
        this.getList()
        this.getInstitutes()
    },
    methods:{       //创建具体的方法，调用student.js定义的方法
        getInstitutes() {
            institute.getInstitute()
                .then(response =>{
                    this.institutes = response.data.ins
                    console.log(response.data.ins)
                })

        },
        //学生列表的方法
        getList(page = 1) {
            this.page = page
            student.getStudentListPage(this.page,this.limit,this.studentQuery)
                .then(response =>{
                    //response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error =>{
                    console.log(error)
                })
        },
        resetData() {
            this.studentQuery = {}

            this.getList()
        },
        removeDataById(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                student.deleteStudentId(id)         
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