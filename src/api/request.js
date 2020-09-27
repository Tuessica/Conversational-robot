import axios from 'axios'

// 重试上限次数
axios.defaults.retry = 0
axios.defaults.retryDelay = 1000
// create an axios instance
const service = axios.create({
  baseURL: '/manager-api', // url = base url + request url
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('request error', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return error
  }
)

export default service