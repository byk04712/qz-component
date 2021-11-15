/*
 * @Author: 秦真
 * @Date: 2021-11-15 11:44:19
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 11:44:19
 * @Description:
 * @FilePath: \admin-fronted\bgy-component\packages\table\index.js
 */
import Table from './src/table.vue'

Table.install = (app) => {
  app.component(Table.name, Table)
}

export default Table
