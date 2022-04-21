/*
 * @Author: 秦真
 * @Date: 2022-02-18 09:25:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-18 15:50:26
 * @Description: Throttle 组件typescript声明文件
 * @FilePath: \qz-component\types\throttle.d.ts
 */
import { QzComponent } from './component'

export declare class Throttle extends QzComponent {
  /**
   * 间隔时间
   * @default 300
   * @type number
   */
  time: number;
  /**
   * 截流的事件
   * @default click
   * @type string
   */
  events: string;
  /**
   * 是否防抖处理
   * @default true
   * @type boolean
   */
  isDebounce?: boolean;
  /**
   * 是否立即执行
   * @default true
   * @type boolean
   */
  isImmediate?: boolean;
}
