import axios from 'axios'

const config = {
  baseURL: '/api',
  timeout: 10 * 1000,
  withCredentials: true, // Check cross-site Access-Control
  xsrfHeaderName: "Authorization",
  xsrfCookieName: "Authorization",
}

const _axios = axios.create(config)

const requestInterceptors = [
  {
    resolved(config) {
      const { xsrfCookieName, xsrfHeaderName } = config
      // console.log('requestInterceptors resolved', config)

      const xsrfCookieNameFromCookie = `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJyYmNwIiwiYXVkIjpbInJiY3BfbXAiXSwiemhfbmFtZSI6IumCseS6kei-viIsInVzZXJfaWQiOiJxaXV5dW5kYSIsInVzZXJfbmFtZSI6InFpdXl1bmRhIiwic2NvcGUiOlsicmVhZCJdLCJjdXN0b21BdXRob3JpdGllcyI6W3sicm9sZUNvZGUiOiJNQl9QQ19NQVJLRVRfUk9MRSIsInJvbGVOYW1lIjoi55Sf6bKc5om55Y-RcGPvvIjkuI3lj6_liKDpmaTvvIkt5biC5Zy6Iiwicm9sZUlkIjoiMjAyMTEyMjcwMDIiLCJ0ZW5hbnRJZCI6InJiY3AiLCJidXNpSWQiOiJyYmNwX21wIiwiYnVzaVR5cGUiOjAsImNsaWVudElkIjoicmJjcF9tcCIsImRhdGFUeXBlIjpudWxsLCJoYXNCdXNpbmVzcyI6bnVsbCwiYXV0aG9yaXR5IjoiMjAyMTEyMjcwMDIifSx7InJvbGVDb2RlIjoiU1VQRVJfQURNSU4iLCJyb2xlTmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInJvbGVJZCI6IjU3OTk1NTU3MDg1NTc3MjE3IiwidGVuYW50SWQiOiJyYmNwIiwiYnVzaUlkIjoicmJjcF9tcCIsImJ1c2lUeXBlIjowLCJjbGllbnRJZCI6InJiY3BfbXAiLCJkYXRhVHlwZSI6bnVsbCwiaGFzQnVzaW5lc3MiOm51bGwsImF1dGhvcml0eSI6IjU3OTk1NTU3MDg1NTc3MjE3In1dLCJleHAiOjE2NDMzNDEyMTksImF1dGhvcml0aWVzIjpbIjU3OTk1NTU3MDg1NTc3MjE3IiwiMjAyMTEyMjcwMDIiXSwianRpIjoiZDdiZGZlZDktMTJmMC00MTYyLWE0NzEtMzY4YjJjOTRkMGU0IiwiY2xpZW50X2lkIjoicmJjcF9tcCJ9.DajN35IYToXt2fKXY6qaNAUa1-YOhxuyKkseA_B1lT3T_2_t30LffsEZX9hfPkyK6B8JWcATjQ_M6cqXoqldxo5diUf1hi0BuWlyatXHZejY_y-vgeVyVhuInzYiqjXwY-SzBWC06yuaQr6zBSRaXfXVv9jEPrwX5oah5dWsjJoBHlo-nlUyCeGsO5swcGP5dxkDCtUdrImOF-bELvmP_lDAfoTsYfeJN3IVhvo6Zxlsd4-5jz7zML9HvS43LpeR9vNB00gCNSh-JnKk04VsHZRYvrI65-XLFEMGkcf5klVkyG3Aj33SxzaBVs-aYv5eYora8ufl-T6YidyqtGjYzA`

      config.headers[xsrfHeaderName] = xsrfCookieNameFromCookie

      return Promise.resolve(config)
    },
    rejected(error) {
      // console.log('requestInterceptors rejected', error)
      return Promise.reject(error)
    }
  }
]

const responsetInterceptors = [
  {
    resolved(config) {
      // console.log('responsetInterceptors resolved', config)
      return Promise.resolve(config)
    },
    rejected(error) {
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
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      $http: {
        get() {
          return _axios
        }
      }
    })
  }
}

export default AxiosPlugin