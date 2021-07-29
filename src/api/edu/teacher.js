import request from '@/utils/request'

export default {

    //讲师列表
    //current 当前页  limit 每页记录数  teacherQuery 条件
    getTeacherListPage(current,limit,teacherQuery) {
        return request({
            // url: '/table/list',
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody(通过json传递数据)，需要加data
            data:teacherQuery       //data标识 把对象转换成json传递到接口
          })
    },
    //删除讲师
    deleteTeacherId(id) {
        return request({
            // url: '/table/list',
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addTeacher(teacher) {
        return request({
            // url: '/table/list',
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data:teacher
          })
    },
    getTeacherInfo(id) {
        return request({
            // url: '/table/list',
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get'
          })
    },
    updateTeacherInfo(teacher) {
        return request({
            // url: '/table/list',
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data:teacher
          })
    }
}
