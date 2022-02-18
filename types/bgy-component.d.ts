import Vue from 'vue'

import { Crud } from './crud/crud'
import { Form } from './form/form'
import { Table } from './table/table'
import { Item } from './item'
import { ItemRange } from './item-range'
import { Split } from './split'
import { Throttle } from './throttle'

/**
 * Install all bgy-component components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(BgyComponent)` to install
 */
export function install(vue: typeof Vue): void

export {
  Crud,
  Form,
  Item,
  ItemRange,
  Split,
  Table,
  Throttle
}