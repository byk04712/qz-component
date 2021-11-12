/*
 * @Author: 秦真
 * @Date: 2021-11-10 15:36:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-10 23:57:21
 * @Description: 组件入口文件
 * @FilePath: /admin-fronted/bgy-component/src/index.js
 */
import { version } from '../package.json'
import BgyForm from '../packages/form/index.js'
import BgyThrottle from '../packages/throttle/index.js'

const components = [
  BgyForm,
  BgyThrottle
]

const install = (Vue, options = {}) => {
  // 注册组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$BGY = {
    size: options.size || 'default'
  }
}

export default {
  // 组件库版本
  version,

  // Vue 插件方法
  install,

  // 组件
  ...components
}
