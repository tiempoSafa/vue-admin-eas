import request from '@/utils/request'

export default {
    getAllChapterVideo(courseId) {
        return request({
            url:`/eduservice/chapter/getChapterVideo/${courseId}`,
            method:'get'
        })
    },
    //添加章节
    addChapter(chapter) {
        return request({
            url:`/eduservice/chapter/addChapter`,
            method:'post',
            data:chapter
        })
    },
    //修改
    getChapter(courseId) {
        return request({
            url:`/eduservice/chapter/getChapterInfo/${courseId}`,
            method:'get'
        })
    },
    updateChapter(chapter) {
        return request({
            url:`/eduservice/chapter/updateChapter`,
            method:'post',
            data:chapter
        })
    },
    deleteChapter(courseId) {
        return request({
            url:`/eduservice/chapter/${courseId}`,
            method:'delete'
        })
    }
}