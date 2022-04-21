/*
 * @Author: 秦真
 * @Date: 2021-11-10 15:12:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 11:12:38
 * @Description: 表单区间字段组件
 * @FilePath: \admin-fronted\qz-component\packages\item-range\index.js
 */
import ItemRange from './src/item-range.vue'

ItemRange.install = (app) => {
  app.component(ItemRange.name, ItemRange)
}

export default ItemRange
