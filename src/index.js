/*
 * @Author: 秦真
 * @Date: 2021-11-10 15:36:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 11:48:36
 * @Description: 组件入口文件
 * @FilePath: \admin-fronted\bgy-component\src\index.js
 */
import { version } from '../package.json'
import Item from '../packages/item/index'
import ItemRange from '../packages/item-range/index'
import Form from '../packages/form/index'
import Table from '../packages/table/index'
import Crud from '../packages/crud/index'
import Split from '../packages/split/index'
import Throttle from '../packages/throttle/index'

const components = [
  Form,
  Item,
  ItemRange,
  Split,
  Table,
  Crud,
  Throttle
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
