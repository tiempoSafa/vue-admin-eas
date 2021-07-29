<template>
    <div class="app-container">
        红外光谱列表

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
        
            <el-table-column prop="intro" label="光谱特点" />

            <el-table-column prop="waveLengthL" label="最小波长" width="80" />

            <el-table-column prop="waveLengthM" label="最大波长" width="80" />
            
            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
            
            <el-table-column prop="sort" label="排序" width="60" />
            
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                <router-link :to="'/edu/teacher/edit/'+scope.row.id">
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
//一如调用teacher.js
import spec from '@/api/spec/spec'

export default {
    //核心代码
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
    methods:{       //创建具体的方法，调用teacher.js定义的方法
        //讲师列表的方法
        getList(page = 1) {
            this.page = page
            spec.getSpecListPage(this.page,this.limit)
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
        }
    }
}
</script>