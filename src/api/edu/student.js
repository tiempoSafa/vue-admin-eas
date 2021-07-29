import request from '@/utils/request'

export default {

    //获取学生分页列表
    //current 当前页  limit 每页记录数
    getStudentListPage(current,limit,studentQuery) {
        return request({
            // url: '/table/list',
            url: `/eduservice/student/pageStudentCondition/${current}/${limit}`,
            method: 'post',
            data:studentQuery
          })
    },
    //删除学生
    deleteStudentId(id) {
        return request({
            // url: '/table/list',
            url: `/eduservice/student/${id}`,
            method: 'delete'
          })
    },
    //添加学生
    addStudent(student) {
        return request({
            // url: '/table/list',
            url: `/eduservice/student/addStudent`,
            method: 'post',
            data:student
          })
    },
    getStudentInfo(id) {
        return request({
            // url: '/table/list',
            url: `/eduservice/student/getStudent/${id}`,
            method: 'get'
          })
    },
    updateStudentInfo(student) {
        return request({
            // url: '/table/list',
            url: `/eduservice/student/updateStudent`,
            method: 'post',
            data:student
          })
    }
}
