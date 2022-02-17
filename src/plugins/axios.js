/*
 * @Author: 秦真
 * @Date: 2022-02-16 16:06:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-17 09:15:51
 * @Description: Axios封装
 * @FilePath: \bgy-component\src\plugins\axios.js
 */
import axios from 'axios'

const DEFAULT_CONFIG = {
  baseURL: '/api',
  timeout: 10 * 1000,
  withCredentials: true, // Check cross-site Access-Control
  xsrfHeaderName: "Authorization",
  xsrfCookieName: "Authorization",
}

export default {
  install(Vue, options = DEFAULT_CONFIG) {
    if (Vue.prototype.$http) {
      return
    }

    const _axios = axios.create(options)

    const {
      requestInterceptors = [],
      responsetInterceptors = []
    } = options

    // 请求拦截
    requestInterceptors.forEach((interceptor) => {
      _axios.interceptors.request.use(interceptor.resolved, interceptor.rejected)
    })

    // 响应拦截
    responsetInterceptors.forEach((interceptor) => {
      _axios.interceptors.response.use(interceptor.resolved, interceptor.rejected)
    })

    Object.defineProperties(Vue.prototype, {
      $http: {
        get() {
          return _axios
        }
      }
    })
  }
}
