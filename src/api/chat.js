import request from './request'

export const postMessage = params => request({
  url: `/apples`,
  method: 'post',
  data: params
})

export const getMessage = () => request({
  url: `/apples`,
  method: 'get'
})