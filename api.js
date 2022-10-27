import axios from '@/utils/request'
// 查询分页数据：
export const getDemoPage = (arg) => {
  return axios.request({
    url: '/sys/Demo/page',
    method: 'get',
    params: arg,
    dataType: 'json'
  })
}
// 查询详情数据：
export const getDemoDetail = (arg) => {
  return axios.request({
    url: `/sys/Demo/${arg}`,
    method: 'get',
    params: arg,
    dataType: 'json'
  })
}

// 添加数据：
export const addDemo = (arg) => {
  return axios.request({
    url: '/sys/Demo',
    method: 'post',
    data: arg,
    dataType: 'json'
  })
}

// 修改数据：
export const updateDemo = (arg) => {
  return axios.request({
    url: '/sys/Demo',
    method: 'put',
    data: arg,
    dataType: 'json'
  })
}

// 删除数据:
export const deleteDemo = (arg) => {
  return axios.request({
    url: '/sys/Demo',
    method: 'delete',
    data: arg,
    dataType: 'json'
  })
}