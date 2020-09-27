import request from './request'

export const postMessage = params => request({
  baseURL: '/robot-api',
  url: `/message/`,
  method: 'post',
  data: params
})

export const getMessage = () => request({
  url: `/apples`,
  method: 'get'
})