/*
 * @Author: 秦真
 * @Date: 2021-11-15 11:38:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 11:41:08
 * @Description: 
 * @FilePath: \admin-fronted\bgy-component\packages\crud\index.js
 */
import Crud from './src/crud.vue'

Crud.install = (app) => {
  app.component(Crud.name, Crud)
}

export default Crud

