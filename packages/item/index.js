/*
 * @Author: 秦真
 * @Date: 2021-11-10 15:12:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 11:08:20
 * @Description: 表单字段组件
 * @FilePath: \admin-fronted\bgy-component\packages\item\index.js
 */
import Item from './src/item.vue'

Item.install = (app) => {
  app.component(Item.name, Item)
}

export default Item
