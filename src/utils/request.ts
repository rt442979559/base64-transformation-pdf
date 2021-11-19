import axios from 'axios'
import { ElMessage } from 'element-plus'

const serverUrl = process.env.VUE_APP_BASE_API

const service = axios.create({
  baseURL: serverUrl,
  timeout: 60000, // request timeout
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (config.params) {

    // }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (!res.success) {
      // 登录失效
      if (res.state === 4 || res.state === '4') {
        console.log('登录失效')
      } else if (res.code === 0) {
        return res
      } else {
        ElMessage({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
