import request from '@/utils/request'

export default {
    getInstitute() {
        return request({
            url: `/eduservice/institute/findAll`,
            method: 'get'
          })
    }
}