import request from '@/utils/request'

export function findAll(params = {}) {
  return request({
    url: '/category/findAll',
    method: 'get',
    params
  })
}
// 添加
export function adddata(data = {}) {
  return request({
    url: '/device/add',
    method: 'post',
    data
  })
}
// 查询页面数据
export function findPage(params = {}) {
  return request({
    url: '/device/findPage',
    method: 'get',
    params
  })
}

// 根据id 查询信息
export function findOne(params = {}) {
  return request({
    url: '/device/findOne',
    method: 'get',
    params
  })
}

// 查询历史纪录   
export function findoldPage(params = {}) {
  return request({
    url: '/history/findPage',
    method: 'get',
    params
  })
}

// 删除设备信息 
export function deviceDelete(params = {}) {
  return request({
    url: '/device/delete',
    method: 'get',
    params
  })
}

// 设备修改
export function editdata(data = {}) {
  return request({
    url: '/device/edit',
    method: 'post',
    data
  })
}