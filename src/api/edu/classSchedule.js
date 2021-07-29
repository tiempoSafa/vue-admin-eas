import request from '@/utils/request'

export default {
    addClassSchedule(grade,major) {
        return request({
            url: `/eduservice/cs/addCS`,
            method: 'post'
          })
    },
    getClassSchedule(csQuery) {
        return request({
            url: `/eduservice/cs/pageCSCondition`,
            method: 'post',
            data:csQuery
          })
    }
}