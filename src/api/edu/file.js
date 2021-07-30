import request from '@/utils/request'

export default {
  addFile(file) {
    return request({
      // url: '/table/list',
      url: `/eduservice/file/addFile`,
      method: 'post',
      data:file       //data标识 把对象转换成json传递到接口
    })
  },
  findAllFile() {
    return request({
      // url: '/table/list',
      url: `/eduservice/file/findAll`,
      method: 'get'
    })
  },
  //删除文件
  deleteFileId(id) {
    return request({
      // url: '/table/list',
      url: `/eduservice/file/${id}`,
      method: 'delete'
    })
  }
}
