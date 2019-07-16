import request from '@/utils/request'

// 获取页面信息
export function findPage(params={}) {
  return request({
    url: '/upcoming/findPage',
    method: 'get',
    params
  })
}
// 根据id 获取信息
export function findOne(params={}) {
    return request({
      url: '/upcoming/findOne',
      method: 'get',
      params
    })
  }

// 删除
export function upcomingdelete(params={}) {
    return request({
      url: '/upcoming/delete',
      method: 'get',
      params
    })
  }

// 修改信息
export function editdata(data={}) {
  return request({
    url: '/upcoming/edit',
    method: 'post',
    data
  })
}