import request from '@/utils/request'

export default {
    //添加小节
    addVideo(video) {
        return request({
            url:`/eduservice/video/addVideo`,
            method:'post',
            data:video
        })
    },
    //修改
    // getChapter(courseId) {
    //     return request({
    //         url:`/eduservice/chapter/getChapterInfo/${courseId}`,
    //         method:'get'
    //     })
    // },
    // updateChapter(chapter) {
    //     return request({
    //         url:`/eduservice/chapter/updateChapter`,
    //         method:'post',
    //         data:chapter
    //     })
    // },
    deleteVideo(id) {
        return request({
            url:`/eduservice/video/${id}`,
            method:'delete'
        })
    },
}