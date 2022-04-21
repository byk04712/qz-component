/*
 * @Author: 秦真
 * @Date: 2022-02-18 09:25:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-18 17:17:23
 * @Description: Item 组件typescript声明文件
 * @FilePath: \qz-component\types\item.d.ts
 */
import { VNode } from 'vue'
import { QzComponent } from './component'

interface OptionItem {
  value: string
  label: string
  disabled?: boolean
}

export declare class BaseItemProps {
  /**
   * Item类型
   * @default text
   * @type string
   */
  type: 'text'
    | 'select'
    | 'date'
    | 'month'
    | 'year'
    | 'area'
    | 'cascader'
    | 'number'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'textarea'
    | 'password'
  /**
   * 提示信息
   * @type string
   */
  placeholder?: string
  /**
   * 字段label信息
   * @type string
   */
  label?: string
  /**
   * 是否禁用
   * @default false
   * @type boolean
   */
  disabled: boolean
}

interface Clearable {
  /**
   * 可清除的
   * @type boolean
   */
  allowClear: boolean
}

interface Options {
  /**
   * 可选项
   * @type array
   */
  options: Array<OptionItem>[]
}

interface Formatable {
  /**
   * 展示内容格式化
   * @type string
   */
  format: string
  /**
   * 值格式化
   * @type string
   */
  valueFormat: string
}

export declare interface TextItemProps extends BaseItemProps, Clearable {
  /**
   * 最大长度限制
   * @default 100
   * @type number
   */
  maxLength: number
  /**
   * tooltip提示信息
   * @type string
   */
  tooltip?: string
}

export declare interface SelectItemProps extends BaseItemProps, Clearable, Options {
  /**
   * 设置 Select 的模式为多选或标签
   * @default default
   * @type string
   */
  mode: 'default' | 'multiple' | 'tags' | 'combobox',
}

export declare interface DateItemProps extends BaseItemProps, Clearable, Formatable {
}

export declare interface MonthItemProps extends BaseItemProps, Clearable, Formatable {
}

export declare interface YearItemProps extends BaseItemProps, Clearable, Formatable {
}

export declare interface CascaderItemProps extends BaseItemProps {
  /**
   * a-cascader 的 v-bind
   */
  resourceConfig: any
}

export declare interface NumberItemProps extends BaseItemProps {
  /**
   * 最小值
   * @type number
   */
  min: number
  /**
   * 最大值
   * @type number
   */
  max: number
  /**
   * 格式化函数
   * @type Function
   */
  formatter: Function
  /**
   * 转换函数
   * @type Function
   */
  parser: Function
  /**
   * 是否为金额类输入框
   * @type boolean
   */
  amount: boolean
  /**
   * 数值精度
   * @type number
   */
  precision: number
  /**
   * 小数点
   * @type string
   */
  decimalSeparator: string
  /**
   * 每次改变步数，可以为小数
   * @default 1
   * @type number|string
   */
  step: number|string
}

export declare interface RadioItemProps extends BaseItemProps, Options {
  /**
   * 设置 a-radio-group 的类型
   * @default radio
   * @type string
   */
  mode?: 'radio' | 'button',
}

export declare interface CheckboxItemProps extends BaseItemProps, Options {
}

export declare interface SwitchItemProps extends BaseItemProps {
  /**
   * 选中时的内容
   * @type string | slot
   */
  checkedChildren: string | VNode
  /**
   * 非选中时的内容
   * @type string | slot
   */
  unCheckedChildren: string | VNode
}

interface AutoSize {
  minRows?: number
  maxRows?: number
}

export declare interface TextareaItemProps extends BaseItemProps, Clearable {
  /**
   * 最大长度限制
   * @default 100
   * @type number
   */
  maxLength: number
  /**
   * 自适应内容高度，可设置为 true|false 或对象：{ minRows: 2, maxRows: 6 }
   * @default false
   * @type boolean | object
   */
  autoSize: boolean | AutoSize
}

export declare interface PasswordItemProps extends BaseItemProps, Clearable {
    /**
   * 最大长度限制
   * @default 100
   * @type number
   */
  maxLength: number
  /**
   * 是否显示切换按钮
   * @default true
   * @type boolean
   */
  visibilityToggle: boolean
}

export declare type ItemProps = TextItemProps
    | SelectItemProps
    | DateItemProps
    | MonthItemProps
    | YearItemProps
    | CascaderItemProps
    | NumberItemProps
    | RadioItemProps
    | CheckboxItemProps
    | SwitchItemProps
    | TextareaItemProps
    | PasswordItemProps

export declare type ItemValue = string | number | Array<any> | object | boolean

export declare class Item extends QzComponent {
  /**
   * 属性
   */
  props: ItemProps
  /**
   * v-model
   * @type any
   */
  value: ItemValue
}
