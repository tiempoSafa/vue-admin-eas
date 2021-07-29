<template>
    <div class="app-container">
        学生添加
        <el-form label-width="120px">
            <el-form-item label="学生名称">
                <el-input v-model="student.name"/>
            </el-form-item>
            <el-form-item label="学生学号">
                <el-input v-model="student.stuId"/>
            </el-form-item>
            <el-form-item label="学生邮箱">
                <el-input v-model="student.email"/>
            </el-form-item>
            <el-form-item label="学生排序">
                <el-input-number v-model="student.sort" controls-position="right" min="0"/>
            </el-form-item>
            <el-form-item label="学生性别">
                <el-select v-model="student.sex" clearable placeholder="请选择">
                <!--
                    数据类型一定要和取出的json中的一致，否则没法回填
                    因此，这里value使用动态绑定的值，保证其数据类型是number
                -->
                <el-option :value="1" label="男"/>
                <el-option :value="2" label="女"/>
                </el-select>
            </el-form-item>
            <el-form-item label="学生学院">
                <el-select v-model="student.institute" clearable placeholder="请选择">
                <!-- <el-option :value="0" label="电信学院"/>
                <el-option :value="1" label="经管学院"/> -->
                <el-option
                    v-for="item in institutes"
                    :key="item.id"
                    :label="item.institute"
                    :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="student.signature" :rows="10" type="textarea"/>
            </el-form-item>
            
            <!-- 学生头像 -->
            <el-form-item label="学生头像">
                
                <!-- 头衔缩略图 -->
                <pan-thumb :image="student.avatar"/>
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
                </el-button>
                
                <!--
                v-show：是否显示上传组件
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                :url：后台上传的url地址
                @close：关闭上传组件
                @crop-upload-success：上传成功后的回调 -->
                <image-cropper
                            v-show="imagecropperShow"
                            :width="300"
                            :height="300"
                            :key="imagecropperKey"
                            :url="BASE_API+'/eduoss/fileoss'"
                            field="file"
                            @close="close"
                            @crop-upload-success="cropSuccess"/>
                            
            </el-form-item>
            
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import studentApi from '@/api/edu/student'
import institute from '@/api/edu/institute'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: { ImageCropper, PanThumb },     //声明组件
    data() {
        return {
            student:{},
            imagecropperShow:false,
            imagecropperKey:0,
            BASE_API: process.env.BASE_API,
            saveBtnDisabled: false,
            institutes:[]
        }
    },
    created() {
        this.init()
        this.getInstitutes()
    },
    watch:{     //监听
        $route(to, from) {  //路由变化执行代码
            // console.log(watch $route);
            this.init()
        }
    },
    methods:{
        getInstitutes() {
            institute.getInstitute()
                .then(response =>{
                    this.institutes = response.data.ins
                    console.log(response.data.ins)
                })

        },
        //关闭上传弹窗
        close() {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey+1
        },
        cropSuccess(data) {
            this.imagecropperShow = false
            this.student.avatar = data.url
            this.imagecropperKey = this.imagecropperKey+1
        },
        init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getInfo(id)
            }else {
                this.student = {}
            }
        },
        //根据学生id查询
        getInfo(id) {
            studentApi.getStudentInfo(id)
            .then(response =>{
                this.student = response.data.student
            })
        },
        saveOrUpdate() {
            //判断是修改还是添加
            if(!this.student.id) {
                this.saveStudent()
            } else {
                this.updateStudent()
            }
            
        },
        updateStudent() {
            studentApi.updateStudentInfo(this.student)
            .then(response =>{
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                //路由跳转
                this.$router.push({ path: '/student/table' })
            })
        },
        //添加学生
        saveStudent() {
            studentApi.addStudent(this.student)
            .then(response =>{
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                //路由跳转
                this.$router.push({ path: '/student/table' })
            })
        }
    }
}
</script>