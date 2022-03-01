import axios from 'axios'

const config = {
  baseURL: '/api',
  timeout: 10 * 1000,
  withCredentials: true, // Check cross-site Access-Control
  xsrfHeaderName: 'Authorization',
  xsrfCookieName: 'Authorization'
}

const _axios = axios.create(config)

const requestInterceptors = [
  {
    resolved (config) {
      return Promise.resolve(config)
    },
    rejected (error) {
      // console.log('requestInterceptors rejected', error)
      return Promise.reject(error)
    }
  }
]

const responsetInterceptors = [
  {
    resolved (config) {
      // console.log('responsetInterceptors resolved', config)
      return Promise.resolve(config)
    },
    rejected (error) {
      // console.log('responsetInterceptors rejected', error)
      return Promise.reject(error)
    }
  }
]

// 请求拦截
requestInterceptors.forEach((interceptor) => {
  _axios.interceptors.request.use(interceptor.resolved, interceptor.rejected)
})

// 响应拦截
responsetInterceptors.forEach((interceptor) => {
  _axios.interceptors.response.use(interceptor.resolved, interceptor.rejected)
})

const AxiosPlugin = {
  install (Vue) {
    Object.defineProperties(Vue.prototype, {
      $http: {
        get () {
          return _axios
        }
      }
    })
  }
}

export default AxiosPlugin
